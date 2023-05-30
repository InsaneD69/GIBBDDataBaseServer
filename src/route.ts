import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import articleController from './client_api/api_controller'
import tokenController, { tokenStore } from './client_api/token_controller'
import { RequestWithToken } from "./client_api/request_type";

export class ErrorResponse extends Error {

	constructor(public message: string, public code: number) {
		super(message);
	}
}


export let info_current_user:{username: string,password: string} | null;

export const ApiRouter = async (fastify: FastifyInstance) => {

	fastify.addHook("onRequest", async (request: RequestWithToken, reply: FastifyReply) => {
		try {

			await request.jwtVerify();

			console.log(request.headers.authorization);

			let cons: boolean = false;
			tokenStore.forEach((token, _username) => {
				console.log(token)
				if (token === request.headers.authorization) {
					cons = true;
				}
			});
			
			info_current_user = fastify.jwt.decode(request.headers.authorization.replace("Bearer ",''))
		
			if (!cons) {
				throw new ErrorResponse("Not valid token", 401);
			}
			

		} catch (err) {
			reply.send(err)
		}
	}),

		// fastify.get("/article", articleController.handleGetArticle),
		// fastify.get("/camera", articleController.handleGetAllInfoAboutCamera),
		fastify.get("/car", articleController.handleGetUnfoAdboutCar),
		fastify.get("/person", articleController.handleGetInfoAboutPerson);


};

export const AuthRouter = async (fastify: FastifyInstance) => {

	fastify.post("/token/policeman", tokenController.handleGetTokenP),
	fastify.post("/token/citizen", tokenController.handleGetTokenC),
	fastify.post("/token/administrator", tokenController.handleGetTokenA);



};


// export default Router;
