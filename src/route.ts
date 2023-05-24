import { FastifyInstance } from "fastify";
import articleController from './client_api/controller'

const Router = async (app: FastifyInstance) => {

//dada	

	app.get("/article",articleController.handleGetArticle);
	app.get("/camera",articleController.handleGetAllInfoAboutCamera);
	app.get("/car",articleController.handleGetUnfoAdboutCar);
	

    // app.get(
	// 	"/get/:id",
	// 	articleController.handleGetArticleById
	// );

};


export default Router;