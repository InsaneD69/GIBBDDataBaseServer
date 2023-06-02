import { FastifyReply} from "fastify";
import { importantInfoAboutCar } from "../db/api/models/db_models";
import { service_business } from "../services";
import { RequestCar, RequestPerson, RequestPostProtocol, RequestProtocol, RequestToken } from "./request_type";
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
		


	if (info_current_user?.username !== undefined && info_current_user?.password !== undefined && info_current_user?.whoami !== undefined) {

        const response  = service_business.getInfoAboutCar(vin,number,region_code,info_current_user.username, info_current_user.password)
		if(await response == "No"){
			reply = reply.code(400).send({
				problem: "Need correct request"
			})
			return  reply
	
		} else{
		
		return  response;
		}
    }
    else {
        reply = reply.code(500).send({
            problem: "oy no"
        })
        return reply
    }
 
	
}


export const handleGetInfoAboutPerson = async (req:  RequestPerson , reply: FastifyReply) => {
	
	
	const passport_number: string | undefined = req.query.passport_number
	const driver_license: string| undefined = req.query.driver_license

	console.log(passport_number)

	if (info_current_user?.username !== undefined && info_current_user?.password !== undefined && info_current_user?.whoami !== undefined) {

        const response  = service_business.getInfoAboutPerson(passport_number,driver_license,info_current_user.username, info_current_user.password)
		if(await response == "No"){
			reply = reply.code(400).send({
				problem: "Need correct request"
			})
			return  reply
	
		} else{
		
		return  response;
		}
    }
    else {
        reply = reply.code(500).send({
            problem: "oy no"
        })
        return reply
    }
	


 
	
}

export const handleGetProtocol = async (req:  RequestProtocol , reply: FastifyReply) => {
	

	if (info_current_user?.username !== undefined && info_current_user?.password !== undefined && info_current_user?.whoami !== undefined) {

		console.log(req.query.case_id)

        const response  = await service_business.getInfoAboutProtocol(req.query.case_id,req.query.vin,req.query.police_id,req.query.passport_number,
			info_current_user.username, info_current_user.password);

			console.log("response in controller")
			console.log(response)
		if(response === "No"){
			
			reply = reply.code(400).send({
				problem: "Need correct request"
			})
			return  reply
	
		} else{
		
		return  response;
		}
    }
    else {
        reply = reply.code(500).send({
            problem: "oy no"
        })
        return reply
    }
	


 
	
}


export const handlePostProtocol = async (req:  RequestPostProtocol, reply: FastifyReply) => {
	
	if (info_current_user?.username !== undefined && info_current_user?.password !== undefined && info_current_user?.whoami !== undefined) {

		console.log(req.body)

        const response  = await service_business.postNewProtocol(req.body,info_current_user.username, info_current_user.password);

			console.log("response in controller")
			console.log(response)

		if(response !== "ok"){
			
			reply = reply.code(500).send({
				problem: "Server error, sorry"
			})
			return  reply
	
		} else{
		
		return  response;
		}
    }
    else {
        reply = reply.code(400).send({
            problem: "oy no"
        })
        return reply
    }
	


 
	
}



export default {
	handleGetUnfoAdboutCar,
	handleGetInfoAboutPerson,
	handleGetProtocol
}
