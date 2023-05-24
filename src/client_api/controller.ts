import { importantInfoAboutCar } from "../db/api/models/db_models";
import { service } from "../services";
import { RequestCar } from "./request_type";


export const handleGetArticle = () => {
	console.log("Im in controller")
	
	return  service.getArticles()
	
}
export const handleGetAllInfoAboutCamera = () => {
	console.log("Im in controller")
	
	return  service.getAllInfoAboutCamera() 
	
}

export const handleGetUnfoAdboutCar = async (req: RequestCar ) => {
	console.log("Im in controller")
	const vin: string | undefined = req.body.vin
	const gosnumber: string| undefined = req.body.gosnumber
	const region_code: number| undefined = req.body.region_code

	if (typeof(vin) === undefined){
		if (typeof(gosnumber) === undefined){
			return "Need correct request \n"+
			"vin: "+vin+
			"\ngosnumber: "+gosnumber+
			"\nregion_code: "+region_code

		}
	}	

	
   
	
	return  service.getInfoAboutCar(req) 

	
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