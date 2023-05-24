
import { article, importantInfoAboutCar_plus_car_user } from './models';
import {TESTgetAllFromArticle, dbgetInfoAboulAllCamera, dbgetInfoAboutCarGOSNUMBER, dbgetInfoAboutCarVIN, dbgetInfoAboutCar_userVIN} from '../db/api/select_data'
import { camera, car_user, importantInfoAboutCar} from '../db/api/models/db_models';
import { RequestCar } from '../client_api/request_type';


export const getArticles = async (): Promise<article[]> => {
	console.log("Im in service");
	const response= await TESTgetAllFromArticle();

	let resp_art: article[] =[] ;
	response.forEach((elem)=>{
		console.log("asas")
		console.log(elem.article_id)
		resp_art.push({
			article_id: elem.article_id,
			description: elem.description,
			price : {start:  elem.price[0].value,end: elem.price[1].value}

		})
		

	});

	return resp_art
}
export const getAllInfoAboutCamera = async (): Promise<any> => {
	console.log("Im in service");
	const response: camera[]= await dbgetInfoAboulAllCamera();

	console.log(response[0].area_name);
	

	return response
}

export const getInfoAboutCar = async (body: RequestCar): Promise<importantInfoAboutCar_plus_car_user> => {

	let response_car: importantInfoAboutCar[];

	if (body.body.gosnumber === undefined){
		response_car = await dbgetInfoAboutCarVIN(body)
	}else{
		response_car = await dbgetInfoAboutCarGOSNUMBER(body)
	}

	let response_car_user: car_user[] = await dbgetInfoAboutCar_userVIN(response_car[0].vin)

	const response: importantInfoAboutCar_plus_car_user={
		car: response_car[0],
		car_users: response_car_user
	}

	return response

	// return response
}

// export const createArticle = async (body: ArticleAttributes): Promise<ArticleAttributes> => {
// 	const response: ArticleAttributes = await ArticleModel.create(body)
// 	return response
// }

// export const updateArticle = async (id: string, body: ArticleAttributes) => {
// 	const response = await ArticleModel.update({ ...body }, { where: { id } })
// 	return response
// }

// export const deleteArticle = async (id: string) => {
// 	const response = await ArticleModel.destroy({ where: { id } });
// 	return response
// }

export default {
	getArticles,
	getAllInfoAboutCamera,
	getInfoAboutCar
	// getOneArticle,
	// createArticle,
	// updateArticle,
	// deleteArticle
}