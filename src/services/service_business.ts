
import { article, importantInfoAboutCar_plus_car_user, person } from './models';
import {  dbgetInfoAboutCarGOSNUMBER, dbgetInfoAboutCarVIN, dbgetInfoAboutCar_userVIN, dbgetInfoAboutPerson } from '../db/api/select_data'
import { camera, car_user, importantInfoAboutCar, infoAboutPerson } from '../db/api/models/db_models';
import { RequestCar } from '../client_api/request_type';
import { info_current_user } from '../route';
import { log } from 'console';


// export const getArticles = async (): Promise<article[]> => {
// 	console.log("Im in service");
// 	const response = await TESTgetAllFromArticle();

// 	let resp_art: article[] = [];
// 	response.forEach((elem) => {
// 		console.log("asas")
// 		console.log(elem.article_id)
// 		resp_art.push({
// 			article_id: elem.article_id,
// 			description: elem.description,
// 			price: { start: elem.price[0].value, end: elem.price[1].value }

// 		})


// 	});

// 	return resp_art
// }
// export const getAllInfoAboutCamera = async (): Promise<any> => {
// 	console.log("Im in service");
// 	const response: camera[] = await dbgetInfoAboulAllCamera();

// 	return response
// }

export const getInfoAboutCar = async (vin: string | undefined, number: string | undefined, region_code: number | undefined,username: string,password: string): Promise<"No" | importantInfoAboutCar_plus_car_user | null> => {

	let response_car: importantInfoAboutCar[];
	console.log(region_code )

	if ((number === undefined || region_code === undefined || number.length < 1 || region_code < 1) && vin !== undefined) {
		response_car = await dbgetInfoAboutCarVIN(vin,username,password)
	} else if (number !== undefined && region_code !== undefined) {
		response_car = await dbgetInfoAboutCarGOSNUMBER(number, region_code,username,password)
	} else { return "No" }


	if(response_car.length == 0){
		return null
	}
	 console.log(response_car[0].vin)
	 
	let response_car_user: car_user[] = await dbgetInfoAboutCar_userVIN(response_car[0].vin,username,password)

	const response: importantInfoAboutCar_plus_car_user = {
		car: response_car[0],
		car_users: response_car_user
	}


	return response
}
export const getInfoAboutPerson = async (passport_number:string | undefined, driver_license: string | undefined, username: string,password: string ): Promise<any> => {
	console.log("Im in service");

	let response_person: infoAboutPerson[];

	console.log(passport_number)
	console.log(typeof driver_license)

	if ((passport_number === undefined || passport_number === null || passport_number === '')&& driver_license !== undefined) {
		response_person = await dbgetInfoAboutPerson(driver_license,"driver_license",username,password);
		console.log("asad")
	} else if (passport_number !== undefined && (driver_license === undefined || driver_license === null || driver_license === '')) {
		console.log("qwert")
		response_person = await dbgetInfoAboutPerson(passport_number,"passport_number",username,password);
	} else { return "No" }


	const response: person = response_person[0];

	return response
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

	getInfoAboutCar,
	getInfoAboutPerson
	// getOneArticle,
	// createArticle,
	// updateArticle,
	// deleteArticle
}