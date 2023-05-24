import { FastifyReply, FastifyRequest } from "fastify";
import { importantInfoAboutCar } from "../db/api/models/db_models";
import { service } from "../services";
import { RequestCar } from "./request_type";
import { Body } from "@nestjs/common";
import { importantInfoAboutCar_plus_car_user } from "../services/models";


export const handleGetArticle = () => {
	console.log("Im in controller")
	
	return  service.getArticles()
	
}
export const handleGetAllInfoAboutCamera = () => {
	console.log("Im in controller")
	
	return  service.getAllInfoAboutCamera() 
	
}

export const handleGetUnfoAdboutCar = async (req:  RequestCar , reply: FastifyReply) => {
	console.log("Im in controller")
	
	console.log(req.query.vin)
    console.log(req.query.number)
	console.log(req.query.region_code)
	const vin: string | undefined = req.query.vin
	const number: string| undefined = req.query.number
	const region_code: number| undefined = req.query.region_code

	
	
	const response  = service.getInfoAboutCar(vin,number,region_code)

	if(await response == "No"){
		reply = reply.code(400).send({
			problem: "Need correct request"
		})
		return  reply

	} else{
	
	return  response;
	}
 
	
}
export default {
	handleGetArticle,
	handleGetAllInfoAboutCamera,
	handleGetUnfoAdboutCar

}
// }
// export const handleGetArticleById = async (req: RequestWithIdArticle) => {
// 	const id = req.params.id;
// 	return articleService.getOneArticle(id)
// }

// export const handleCreateArticle = async (req: ArticleCreateRequest) => {
// 	const { title, text, type } = req.body
// 	return articleService.createArticle({ title, text, type })
// }

// export const handleUpdateArticle = async (req: UpdateArticleRequest) => {
// 	const { title, text, type } = req.body
// 	return articleService.updateArticle(req.params.id, { title, text, type })
// }

// export const handleDeleteArticle = async (req: RequestWithIdArticle) => {
// 	return articleService.deleteArticle(req.params.id)
// }





	// handleGetArticleById,
	// handleCreateArticle,
	// handleUpdateArticle,
	// handleDeleteArticle