import { FastifyReply} from "fastify";
import { importantInfoAboutCar } from "../db/api/models/db_models";
import { service_business } from "../services";
import { RequestCar, RequestPerson, RequestToken } from "./request_type";
import { Body } from "@nestjs/common";
import { importantInfoAboutCar_plus_car_user } from "../services/models";
import fastify from "../app";
import { info_current_user } from "../route";
import { testCredentialsToDB } from "../db/api/test_connection";



// export const handleGetArticle = () => {
// 	console.log("Im in controller")
	
// 	return  ervice_business .getArticles()
	
// }
// export const handleGetAllInfoAboutCamera = () => {
// 	console.log("Im in controller")
	
// 	return  service.getAllInfoAboutCamera() 

	
// }

export const handleGetUnfoAdboutCar = async (req:  RequestCar, reply: FastifyReply) => {

	const vin: string | undefined = req.query.vin
	const number: string| undefined = req.query.number
	const region_code: number| undefined = req.query.region_code
		
	const response  = service_business .getInfoAboutCar(vin,number,region_code)

	if(await response == "No"){
		reply = reply.code(400).send({
			problem: "Need correct request"
		})
		return  reply

	} else{
	
	return  response;
	}
 
	
}


export const handleGetInfoAboutPerson = async (req:  RequestPerson , reply: FastifyReply) => {
	
	
	const passport_number: string | undefined = req.query.passport_number
	const driver_license: string| undefined = req.query.driver_license

	console.log(passport_number)
	
	
	const response  = service_business.getInfoAboutPerson(passport_number,driver_license)

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
	handleGetUnfoAdboutCar,
	handleGetInfoAboutPerson,
}
