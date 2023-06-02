
import { articleInfo, dataForAddPerson, dataForPayFine, importantInfoAboutCar_plus_car_user, newProtocol, person, protocol } from './models';
import { dbgetArticles, dbgetInfoAboutCarGOSNUMBER, dbgetInfoAboutCarVIN, dbgetInfoAboutCar_userVIN, dbgetInfoAboutPerson, dbgetInfoAboutProtocol, dbgetInfoAboutProtocolArticle, dbgetInfoAboutProtocolFine } from '../db/api/select_data'
import { article, articles, car_user, dbAnswerOnFinePay, fine, importantInfoAboutCar, infoAboutPerson, typeOfdbAnswerOnFinePay } from '../db/api/models/db_models';
import { dbconnectionCitizenClient, dbconnectionPoliceman, dbconnectionPolicemanClient } from '../db/connect';
import { Md5 } from 'ts-md5';
import { Sequelize } from 'sequelize';
import { dbCreateProtocol } from '../db/api/transactions';
import { dbpostPersonForAccount } from '../db/api/insert_data';
import { dbupdateFineStatus } from '../db/api/update_data';
import { dbDeleteAccToPersonConnect, dbDeleteCitizenAccount } from '../db/api/delete_data';


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
export const getArticles = async (username: string, password: string): Promise<Array<articleInfo>> => {
	console.log("Im in service");

	const sequelize = new Sequelize(dbconnectionPolicemanClient(username, Md5.hashStr(password)));
	const response: article[] = await dbgetArticles(sequelize);
	// console.log("get from select")
	// console.log(response)
	let resp_art: Array<articleInfo> = [];
	response.forEach((elem) => {

		let price: {
			start: number,
			end: number
		} | null;

		let deprivation_months: {
			start: number,
			end: number
		} | null;

		if (elem.price === null) {
			price = null
		} else {
			price = {
				start: elem.price[0].value,
				end: elem.price[1].value
			}
		}

		if (elem.deprivation_months === null) {
			deprivation_months = null
		} else {
			deprivation_months = {
				start: elem.deprivation_months[0].value,
				end: elem.deprivation_months[1].value
			}
		}
		resp_art.push({
			article_id: elem.article_id,
			description: elem.description,
			price: price,
			deprivation_months: deprivation_months
		})
	});


	// console.log("resp_art")
	// console.log(resp_art)

	return resp_art
}

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
	police_id: string | undefined, passport_number: string | undefined, username: string, password: string, whoami: "policeman"| "citizen" | "administrator"): Promise<any> => {

	let response_protocol: protocol[];

	let sequelize: Sequelize;
	if(whoami === 'policeman'){
	
		sequelize=new Sequelize(dbconnectionPolicemanClient(username, Md5.hashStr(password)));

	}else if(whoami === 'citizen'){
		sequelize=new Sequelize(dbconnectionCitizenClient(username, Md5.hashStr(password)));
	} else{
		return "no perm"
	}

	

	if (case_id !== undefined && case_id !== null && case_id > 0) {

		response_protocol = await dbgetInfoAboutProtocol(sequelize, case_id, "case_id");

	} else if (passport_number !== undefined && passport_number !== null && passport_number !== '') {

		response_protocol = await dbgetInfoAboutProtocol(sequelize, passport_number, "passport_number");

	} else if (vin !== undefined && vin !== null && vin !== '') {

		response_protocol = await dbgetInfoAboutProtocol(sequelize, vin, "vin");

	} else if (police_id !== undefined && police_id !== null && police_id !== '') {

		response_protocol = await dbgetInfoAboutProtocol(sequelize, police_id, "police_id");
	} else {
		console.log("im i else")
		return "No"
	}



	for (let i = 0; i < response_protocol.length; i++) {

		const responce_art: articles[] = await dbgetInfoAboutProtocolArticle(sequelize, response_protocol[i].case_id);
		response_protocol[i].articles = responce_art

		const responce_fine: fine[] = await dbgetInfoAboutProtocolFine(sequelize, response_protocol[i].case_id);
		response_protocol[i].fines = responce_fine

	}


	console.log(response_protocol)


	return response_protocol
}


export const postNewProtocol = async (protocol: newProtocol, username: string, password: string): Promise<"ok" | "not ok"> => {

	const sequelize = new Sequelize(dbconnectionPolicemanClient(username, Md5.hashStr(password)));


	const response = await dbCreateProtocol(sequelize, protocol);





	return "ok";
}


export const postNewAccConnection = async (data: dataForAddPerson, username: string, password: string): Promise<"ok" | "not ok"> => {

	const sequelize = new Sequelize(dbconnectionCitizenClient(username, Md5.hashStr(password)));


	const response = await dbpostPersonForAccount(sequelize,username, data.passport_number);


	return "ok";
}

export const putFineStatus = async (data: dataForPayFine, username: string, password: string): Promise<typeOfdbAnswerOnFinePay> => {

	const sequelize = new Sequelize(dbconnectionCitizenClient(username, Md5.hashStr(password)));


	const response: dbAnswerOnFinePay[] = await dbupdateFineStatus(sequelize,data.case_id,data.payment);

	
	return response[0].paymentfine
	
	
}

export const deleteCitizenAccount = async (verify_password: string, username: string, password: string): Promise<"ok"|"error"|"no have permissions"> => {

	if(verify_password!==password){
		return "no have permissions"
	}

	const sequelize = new Sequelize(dbconnectionCitizenClient(username, Md5.hashStr(password)));


	const response = await dbDeleteCitizenAccount(sequelize, username);

	switch(response){

		case "ok":
			return 'ok'
		case "error":
			return 'error'
	}
	
	
}


export const deleteAccToPersonConnect = async (passport_number: number, username: string, password: string): Promise<"ok"|"error"> => {

	const sequelize = new Sequelize(dbconnectionCitizenClient(username, Md5.hashStr(password)));


	const response = await dbDeleteAccToPersonConnect(sequelize, passport_number);

	switch(response){

		case "ok":
			return 'ok'
		case "error":
			return 'error'
	}
	
	
}



export default {

	getInfoAboutCar,
	getInfoAboutPerson,
	getInfoAboutProtocol,
	postNewProtocol,
	getArticles,
	postNewAccConnection, 
	putFineStatus,
	deleteAccToPersonConnect
}