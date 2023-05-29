import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import articleController from './client_api/controller'
import tokenController, { tokenStore } from './client_api/token_controller'
import { Contains } from "sequelize-typescript";
import token_controller from "./client_api/token_controller";
export class ErrorResponse extends Error {

	constructor(public message: string, public code: number) {
		super(message);
	}
}
type RequestWithToken = FastifyRequest<{
	Headers: { authorization: string };
}>

export let info_current_user:any;

export const Router = async (fastify: FastifyInstance) => {

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

			console.log(info_current_user)
			if (!cons) {
				throw new ErrorResponse("Not valid token", 401);
			}
			



		} catch (err) {
			reply.send(err)
		}
	}),

		fastify.get("/article", articleController.handleGetArticle),
		fastify.get("/camera", articleController.handleGetAllInfoAboutCamera),
		fastify.get("/car", articleController.handleGetUnfoAdboutCar),
		fastify.get("/person", articleController.handleGetInfoAboutPerson);


};

export const AuthRouter = async (fastify: FastifyInstance) => {

	// fastify.post('/auth/token', (req: F, reply: { send: (arg0: { token: any; }) => void; }) => {
	// 	// some code
	// 		const token = fastify.jwt.sign({ 

	// 		 })
	// 	reply.send({ token })
	// 	})

	fastify.post("/token", tokenController.handleGetToken)



};


// export default Router;
