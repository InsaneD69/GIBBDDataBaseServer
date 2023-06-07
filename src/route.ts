import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import apiController from './client_api/api_controller'
import tokenController, { tokenStore } from './client_api/token_controller'
import accController from './client_api/account_controller'
import { RequestWithToken } from "./client_api/models/request_models";

export class ErrorResponse extends Error {

	constructor(public message: string, public code: number) {
		super(message);
	}
}

export let info_current_user:{username: string,password: string,whoami:"policeman"| "citizen" | "administrator"} | null;

export const ApiPoliceRouter = async (fastify: FastifyInstance) => {

	fastify.addHook("onRequest", async (request: RequestWithToken, reply: FastifyReply) => {
		try {

			await request.jwtVerify();
			console.log(request.headers.authorization);

			info_current_user = fastify.jwt.decode(request.headers.authorization.replace("Bearer ",''))
			if(info_current_user?.whoami !== 'policeman'){
				throw new ErrorResponse("You don't have enough rights", 401);
			}
		
			if (!tokenStore.has(request.headers.authorization)) {
				console.log("1---------------")
				throw new ErrorResponse("Not valid token", 401);
				
			} else if (tokenStore.get(request.headers.authorization) ! == info_current_user.username){
				console.log("2---------------")
				throw new ErrorResponse("Not valid token", 401);
			}
			

		} catch (err) {
			return reply.code(401).send(err);
		}
	}),

	fastify.get("/car",apiController.handleGetUnfoAdboutCar),
	fastify.get("/person", apiController.handleGetInfoAboutPerson),
	fastify.get("/protocol", apiController.handleGetProtocol),
	fastify.get("/articles", apiController.handleGetArticle),
	fastify.get("/complaint", apiController.handleGetComplaint),
	fastify.get("/unseencomplaint", apiController.handleGetInfoAboutUnseenComplaint),

	fastify.post("/protocol", apiController.handlePostProtocol),

	fastify.put("/complaint", apiController.handleUpdateComplaintStatus),

	fastify.delete("/protocol", apiController.handleDeleteProtocol);

};
export const ApiCitizenRouter = async (fastify: FastifyInstance) => {

	fastify.addHook("onRequest", async (request: RequestWithToken, reply: FastifyReply) => {
		try {

			await request.jwtVerify();

			console.log(request.headers.authorization);

			info_current_user = fastify.jwt.decode(request.headers.authorization.replace("Bearer ",''))
			if(info_current_user?.whoami !== 'citizen'){
				throw new ErrorResponse("You don't have enough rights", 401);
			}
			if (!tokenStore.has(info_current_user.username)) {
				throw new ErrorResponse("Not valid token", 401);
				
			} else if (tokenStore.get(info_current_user.username) !== request.headers.authorization){
				throw new ErrorResponse("Not valid token", 401);
			}
			

		} catch (err) {
			
			return reply.code(401).send(err);
		}
	}),


	fastify.get("/protocol", apiController.handleGetProtocol),
	fastify.get("/person", apiController.handleGetAccConnection),
	fastify.get("/complaint", apiController.handleGetComplaint),
	fastify.get("/sumfine", apiController.handleGetSumPersonFines),

	fastify.put("/payfine", apiController.handleUpdateFineStatus),

	fastify.post("/person", apiController.handlePostAccConnection),
	fastify.post("/complaint", apiController.handlePostComplaint),
	
	fastify.delete("/person", apiController.handleDeleteAccConnection),
	fastify.delete("/complaint", apiController.handleDeleteComplaint);
	


};
export const ApiAdministratorRouter = async (fastify: FastifyInstance) => {

	fastify.addHook("onRequest", async (request: RequestWithToken, reply: FastifyReply) => {
		try {

			await request.jwtVerify();

			console.log(request.headers.authorization);

			info_current_user = fastify.jwt.decode(request.headers.authorization.replace("Bearer ",''))
			if(info_current_user?.whoami !== 'administrator'){
				throw new ErrorResponse("You don't have enough rights", 401);
			}
			if (!tokenStore.has(info_current_user.username)) {
				throw new ErrorResponse("Not valid token", 401);
				
			} else if (tokenStore.get(info_current_user.username) !== request.headers.authorization){
				throw new ErrorResponse("Not valid token", 401);
			}

		} catch (err) {
			return reply.code(401).send(err);
		}
	})



};


export const AccountRouter = async (fastify: FastifyInstance) => {


	fastify.addHook("onRequest", async (request: RequestWithToken, reply: FastifyReply) => {
		
		console.log(request.routerPath)
		if(request.routerPath !== '/acc/citizen'){
				
		
		try {
			
			await request.jwtVerify();

			let cons = false;
			info_current_user = fastify.jwt.decode(request.headers.authorization.replace("Bearer ",''))

			if(info_current_user?.whoami !== undefined){

			
				if (!tokenStore.has(info_current_user.username)) {
					throw new ErrorResponse("Not valid token", 401);
					
				} else if (tokenStore.get(info_current_user.username) !== request.headers.authorization){
					throw new ErrorResponse("Not valid token", 401);
				}
			
			}
			else {
				throw new ErrorResponse("Not valid token", 401);
			}
		} catch (err) {
			reply.code(401).send(err)
		}
	}
	}),

	fastify.post("/citizen",accController.handleRegisterCitizen),
	fastify.post("/logout",accController.handleLogout),
	fastify.delete("/citizen",accController.handleDeleteCitizen);
	
};

export const AuthRouter = async (fastify: FastifyInstance) => {

	fastify.post("/token/policeman", tokenController.handleGetTokenP),
	fastify.post("/token/citizen", tokenController.handleGetTokenC),
	fastify.post("/token/administrator", tokenController.handleGetTokenA);
	

};