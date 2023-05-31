
import { article, importantInfoAboutCar_plus_car_user, person, protocol } from './models';
import { dbgetInfoAboutCarGOSNUMBER, dbgetInfoAboutCarVIN, dbgetInfoAboutCar_userVIN, dbgetInfoAboutPerson, dbgetInfoAboutProtocol, dbgetInfoAboutProtocolArticle } from '../db/api/select_data'
import { articles, car_user, importantInfoAboutCar, infoAboutPerson } from '../db/api/models/db_models';
import { dbconnectionPoliceman, dbconnectionPolicemanClient } from '../db/connect';
import { Md5 } from 'ts-md5';
import { Sequelize } from 'sequelize';


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

export const getInfoAboutCar = async (vin: string | undefined, number: string | undefined, region_code: number | undefined, username: string, password: string): Promise<"No" | importantInfoAboutCar_plus_car_user | null> => {

	let response_car: importantInfoAboutCar[];
	console.log(region_code)


	const sequelize = new Sequelize(dbconnectionPolicemanClient(username, Md5.hashStr(password)));

	if ((number === undefined || region_code === undefined || number.length < 1 || region_code < 1) && vin !== undefined) {
		response_car = await dbgetInfoAboutCarVIN(sequelize, vin)
	} else if (number !== undefined && region_code !== undefined) {
		response_car = await dbgetInfoAboutCarGOSNUMBER(sequelize, number, region_code)
	} else { return "No" }


	if (response_car.length == 0) {
		return null
	}
	console.log(response_car[0].vin)

	let response_car_user: car_user[] = await dbgetInfoAboutCar_userVIN(sequelize, response_car[0].vin)

	const response: importantInfoAboutCar_plus_car_user = {
		car: response_car[0],
		car_users: response_car_user
	}


	return response
}
export const getInfoAboutPerson = async (passport_number: string | undefined, driver_license: string | undefined, username: string, password: string): Promise<any> => {
	console.log("Im in service");

	let response_person: infoAboutPerson[];

	const sequelize = new Sequelize(dbconnectionPolicemanClient(username, Md5.hashStr(password)));

	if ((passport_number === undefined || passport_number === null || passport_number === '') && driver_license !== undefined) {

		response_person = await dbgetInfoAboutPerson(sequelize, driver_license, "driver_license");

	} else if (passport_number !== undefined && (driver_license === undefined || driver_license === null || driver_license === '')) {

		response_person = await dbgetInfoAboutPerson(sequelize, passport_number, "passport_number");

	} else { return "No" }


	const response: person = response_person[0];

	return response
}

export const getInfoAboutProtocol = async (case_id: number | undefined, vin: string | undefined,
	police_id: string | undefined, passport_number: string | undefined, username: string, password: string): Promise<any> => {

	let response_protocol: protocol[];

	const sequelize = new Sequelize(dbconnectionPolicemanClient(username, Md5.hashStr(password)));

	if (case_id !== undefined && case_id !== null && case_id > 0) {

		response_protocol = await dbgetInfoAboutProtocol(sequelize, case_id, "case_id");

	} else if (passport_number !== undefined && passport_number !== null && passport_number !== '') {

		response_protocol = await dbgetInfoAboutProtocol(sequelize, passport_number, "passport_number");

	} else  if (vin !== undefined && vin !== null && vin !== '') {

		response_protocol = await dbgetInfoAboutProtocol(sequelize, vin, "vin");

	} else  if (police_id !== undefined && police_id !== null && police_id !== '') {

		response_protocol = await dbgetInfoAboutProtocol(sequelize, police_id, "police_id");
	} else { console.log("im i else")
	return "No" }

	

		 for(let i =0;i<response_protocol.length;i++ ) {

			const responce_art: articles[] = await dbgetInfoAboutProtocolArticle(sequelize, response_protocol[i].case_id);
			response_protocol[i].articles=responce_art
			
		}

  
	console.log(response_protocol)


	return response_protocol
}

export default {

	getInfoAboutCar,
	getInfoAboutPerson,
	getInfoAboutProtocol

}