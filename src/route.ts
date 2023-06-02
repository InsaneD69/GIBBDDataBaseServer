import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import apiController from './client_api/api_controller'
import tokenController, { tokenStore } from './client_api/token_controller'
import accController from './client_api/account_controller'
import { RequestWithToken } from "./client_api/request_type";

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

			let cons: boolean = false;

			tokenStore.forEach((token, _username) => {
				console.log(token)
				if (token === request.headers.authorization) {
					cons = true;
				}
			});
			
		
			if (!cons) {
				throw new ErrorResponse("Not valid token", 401);
			}
			

		} catch (err) {
			reply.send(err)
		}
	}),

		// fastify.get("/article", articleController.handleGetArticle),
		// fastify.get("/camera", articleController.handleGetAllInfoAboutCamera),
		fastify.get("/car",apiController.handleGetUnfoAdboutCar),
		fastify.get("/person", apiController.handleGetInfoAboutPerson),
		fastify.get("/protocol", apiController.handleGetProtocol);
		// fastify.post("/protocol", apiController.)



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

			let cons: boolean = false;

			tokenStore.forEach((token, _username) => {
				console.log(token)
				if (token === request.headers.authorization) {
					cons = true;
				}
			});
			
		
			if (!cons) {
				throw new ErrorResponse("Not valid token", 401);
			}
			

		} catch (err) {
			reply.send(err)
		}
	})

		


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

			let cons: boolean = false;

			tokenStore.forEach((token, _username) => {
				console.log(token)
				if (token === request.headers.authorization) {
					cons = true;
				}
			});
			
		
			if (!cons) {
				throw new ErrorResponse("Not valid token", 401);
			}
			

		} catch (err) {
			reply.send(err)
		}
	})



};


export const AccountRouter = async (fastify: FastifyInstance) => {


	fastify.addHook("onRequest", async (request: RequestWithToken, reply: FastifyReply) => {
		
		console.log(request.routerPath)
		if(request.routerPath !== '/acc/citizen/register'){
				
		
		try {
			
			await request.jwtVerify();

			let cons: boolean = false;
			info_current_user = fastify.jwt.decode(request.headers.authorization.replace("Bearer ",''))
			tokenStore.forEach((token, _username) => {
				console.log(token)
				if (token === request.headers.authorization) {
					cons = true;
				}
			});
			
		
			if (!cons) {
				throw new ErrorResponse("Not valid token", 401);
			}
			

		} catch (err) {
			reply.send(err)
		}
	}
	}),

	fastify.post("/citizen/register",accController.handleRegisterCitizen),
	fastify.post("/logout",accController.handleLogout),
	fastify.post("/citizen/delete",accController.handleDeleteCitizen);
	

};

export const AuthRouter = async (fastify: FastifyInstance) => {

	fastify.post("/token/policeman", tokenController.handleGetTokenP),
	fastify.post("/token/citizen", tokenController.handleGetTokenC),
	fastify.post("/token/administrator", tokenController.handleGetTokenA);
	

	



};


// export default Router;
