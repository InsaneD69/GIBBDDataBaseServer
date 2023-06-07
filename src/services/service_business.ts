
import { answerOnComplaint, articleInfo, dataAboutConnectedPerson, dataForAddPerson, dataForPayFine, getComplaintMeth, importantInfoAboutCar_plus_car_user, newComplaint, newProtocol, person, protocol } from '../client_api/models/response_models';
import { dbgetAcc_ToPerson, dbgetArticles, dbgetFinesSum, dbgetInfoAboutCarGOSNUMBER, dbgetInfoAboutCarVIN, dbgetInfoAboutCar_userVIN, dbgetInfoAboutComplaint, dbgetInfoAboutPerson, dbgetInfoAboutProtocol, dbgetInfoAboutProtocolArticle, dbgetInfoAboutProtocolFine, dbgetInfoAboutUnseenComplaint } from '../db/db_api/select_data'
import { article, articles, car_user, complaint, dbAnswerOnFinePay, fine, importantInfoAboutCar, infoAboutPerson, personToAccount, sumFines, typeOfdbAnswerOnFinePay } from '../db/db_api/models/db_models';
import { dbconnectionCitizenClient, dbconnectionPolicemanClient } from '../db/connect';
import { Md5 } from 'ts-md5';
import { Sequelize } from 'sequelize';
import { dbCreateProtocol } from '../db/db_api/transactions';
import { dbupdateComplaintStatus, dbupdateFineStatus } from '../db/db_api/update_data';
import { dbDeleteAccToPersonConnect, dbDeleteCitizenAccount, dbDeleteComplaint, dbDeleteProtocol } from '../db/db_api/delete_data';
import { dbpostNewComplaint, dbpostNewPersonToAccount } from '../db/db_api/insert_data';


export const getArticles = async (username: string, password: string): Promise<Array<articleInfo>> => {
	console.log("Im in service");

	const sequelize = new Sequelize(dbconnectionPolicemanClient(username, Md5.hashStr(password)));
	const response: article[] = await dbgetArticles(sequelize);

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

	return resp_art
}


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

	const response_car_user: car_user[] = await dbgetInfoAboutCar_userVIN(sequelize, response_car[0].vin)

	const response: importantInfoAboutCar_plus_car_user = {
		car: response_car[0],
		car_users: response_car_user
	}


	return response
}

export const getInfoAboutPerson = async (passport_number: number| undefined, driver_license: string | undefined, username: string, password: string): Promise<any> => {
	
	let response_person: infoAboutPerson[];

	const sequelize = new Sequelize(dbconnectionPolicemanClient(username, Md5.hashStr(password)));

	console.log(passport_number)
	console.log(typeof passport_number)
    passport_number = Number(passport_number)
	console.log(passport_number)

	if ((passport_number === undefined || passport_number === 0) && driver_license !== undefined) {

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
		return "The correct value is not presented "
	}


	for (let i = 0; i < response_protocol.length; i++) {

		const responce_art: articles[] = await dbgetInfoAboutProtocolArticle(sequelize, response_protocol[i].case_id);
		response_protocol[i].articles = responce_art

		const responce_fine: fine[] = await dbgetInfoAboutProtocolFine(sequelize, response_protocol[i].case_id);
		response_protocol[i].fines = responce_fine

	}

	return response_protocol
}

export const postNewProtocol = async (protocol: newProtocol, username: string, password: string): Promise<any> => {

	const sequelize = new Sequelize(dbconnectionPolicemanClient(username, Md5.hashStr(password)));

	const response = await dbCreateProtocol(sequelize, protocol);

	return response;
}

export const postNewAccConnection = async (data: dataForAddPerson, username: string, password: string): Promise<"ok" | "not ok"> => {

	const sequelize = new Sequelize(dbconnectionCitizenClient(username, Md5.hashStr(password)));


	const response = await dbpostNewPersonToAccount(sequelize,username, data.passport_number);


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

export const getInfoLinkPerson = async ( username: string, password: string): Promise<dataAboutConnectedPerson[]> => {

	const sequelize = new Sequelize(dbconnectionCitizenClient(username, Md5.hashStr(password)));


	const response: personToAccount[] = await dbgetAcc_ToPerson(sequelize);


	let answerWithLinkPerson: Array<dataAboutConnectedPerson> = [];
	response.forEach((one_person)=>{
		answerWithLinkPerson.push({
			name: one_person.person_name,
			surname: one_person.surname,
			patronymic: one_person.patronymic,
			passport_number: one_person.passport_number
		})
	})
	
	return answerWithLinkPerson;
	
}

export const getInfoComplaint = async (using_var:getComplaintMeth, username: string, password: string, whoami: "policeman"| "citizen" | "administrator"): Promise<complaint[] |"no perm"|  "The correct value is not presented "> => {

	let response_complaint: complaint[];

	let sequelize: Sequelize;
	if(whoami === 'policeman'){
	
		sequelize=new Sequelize(dbconnectionPolicemanClient(username, Md5.hashStr(password)));

	}else if(whoami === 'citizen'){
		sequelize=new Sequelize(dbconnectionCitizenClient(username, Md5.hashStr(password)));
	} else{
		return "no perm"
	}

	using_var.case_id = Number(using_var.case_id)
	using_var.passport_number= Number(using_var.passport_number)
	using_var.complaint_id= Number(using_var.complaint_id)

	if (typeof(using_var.case_id) === "number" && using_var.case_id > 0) {

		response_complaint = await dbgetInfoAboutComplaint(sequelize, using_var.case_id, "case_id");

	} else if (typeof(using_var.passport_number) === "number" && using_var.passport_number > 0) {

		response_complaint = await dbgetInfoAboutComplaint(sequelize, using_var.passport_number, "passport_number");

	} else if (typeof(using_var.complaint_id) === "number" && using_var.complaint_id > 0) {

		response_complaint = await dbgetInfoAboutComplaint(sequelize, using_var.complaint_id, "complaint_id");

	} else {
		console.log("gg")
		return "The correct value is not presented "
	}

	console.log(response_complaint)

	return response_complaint;
}


export const postNewComplaint = async (complaint: newComplaint, username: string, password: string): Promise<any> => {

	const sequelize = new Sequelize(dbconnectionCitizenClient(username, Md5.hashStr(password)));

	const response = await dbpostNewComplaint(sequelize, complaint);

	console.log(response);

	return "ok";
}

export const putComplaintStatus = async (data: answerOnComplaint, username: string, password: string): Promise<any> => {

	const sequelize = new Sequelize(dbconnectionPolicemanClient(username, Md5.hashStr(password)));


	const response = await dbupdateComplaintStatus(sequelize,data);

	
	return response;
	
	
}


export const deleteComplaint = async (complaint_id: number, username: string, password: string): Promise<"ok"|"error"> => {

	const sequelize = new Sequelize(dbconnectionCitizenClient(username, Md5.hashStr(password)));


	const response = await dbDeleteComplaint(sequelize, complaint_id);

	switch(response){

		case "ok":
			return 'ok'
		case "error":
			return 'error'
	}
	
	
}

export const deleteProtocol = async (case_id: number, username: string, password: string): Promise<"ok"|"error"> => {

	const sequelize = new Sequelize(dbconnectionPolicemanClient(username, Md5.hashStr(password)));


	const response = await dbDeleteProtocol(sequelize,case_id);

	switch(response){

		case "ok":
			return 'ok'
		case "error":
			return 'error'
	}
	
	
}

export const getSumPersonFines = async (passport_number: number,  username: string, password: string): Promise<sumFines> => {

	const sequelize = new Sequelize(dbconnectionCitizenClient(username, Md5.hashStr(password)));


	const response: sumFines[]= await dbgetFinesSum(sequelize,passport_number);

	
	return response[0];
	
}

export const getInfoAboutUnseenComplaint = async (username: string, password: string): Promise<complaint[]> => {

	const sequelize = new Sequelize(dbconnectionPolicemanClient(username, Md5.hashStr(password)));


	const response: complaint[]= await dbgetInfoAboutUnseenComplaint(sequelize);

	
	return response;
	
}


export default {
	deleteComplaint,
	deleteProtocol,
	postNewComplaint,
	getInfoAboutCar,
	getInfoAboutPerson,
	getInfoAboutProtocol,
	postNewProtocol,
	getArticles,
	postNewAccConnection, 
	putFineStatus,
	deleteAccToPersonConnect,
	getInfoLinkPerson,
	getInfoComplaint,
	putComplaintStatus,
	getSumPersonFines,
	getInfoAboutUnseenComplaint 
}