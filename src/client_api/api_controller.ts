import { FastifyReply, FastifyRequest } from "fastify";
import { complaint, importantInfoAboutCar } from "../db/api/models/db_models";
import { service_business } from "../services";
import { RequestCar, RequestDeleteAccConn, RequestDeleteComplaint, RequestDeleteProtocol, RequestGetComplaint, RequestPayFine, RequestPerson, RequestPostAccConn, RequestPostComplaint, RequestPostProtocol, RequestProtocol, RequestToken, RequestUpdateComplaint } from "./request_type";
import { Body } from "@nestjs/common";
import { answerOnComplaint, articleInfo, getComplaintMeth, importantInfoAboutCar_plus_car_user, newComplaint, newProtocol } from "../services/models";
import fastify from "../app";
import { info_current_user } from "../route";
import { testCredentialsToDB } from "../db/api/test_connection";
import { reqPostProtocolValidator, reqPostComplaintValidator, reqUpdateComplaintValidator } from '../validators';


export const handleGetArticle = async (req: FastifyRequest, reply: FastifyReply) => {

	if (info_current_user?.username !== undefined && info_current_user?.password !== undefined && info_current_user?.whoami !== undefined) {

		await service_business.getArticles(info_current_user.username, info_current_user.password).then((response) => {
			if (response == null) {
				reply = reply.code(500).send({
					problem: "Server Error"
				})
				return reply

			} else {

				console.log("contr have: ")
				console.log(response)
				return reply.send(response);
			}


		})

	}
	else {
		reply = reply.code(500).send({
			problem: "oy no"
		})
		return reply
	}


}
// export const handleGetAllInfoAboutCamera = () => {
// 	console.log("Im in controller")

// 	return  service.getAllInfoAboutCamera() 


// }

export const handleGetUnfoAdboutCar = async (req: RequestCar, reply: FastifyReply) => {

	const vin: string | undefined = req.query.vin
	const number: string | undefined = req.query.number
	const region_code: number | undefined = req.query.region_code



	if (info_current_user?.username !== undefined && info_current_user?.password !== undefined && info_current_user?.whoami !== undefined) {

		const response = service_business.getInfoAboutCar(vin, number, region_code, info_current_user.username, info_current_user.password)
		if (await response == "No") {
			reply = reply.code(400).send({
				problem: "Need correct request"
			})
			return reply

		} else {

			return response;
		}
	}
	else {
		return reply.code(500).send("Server Error")
	}


}


export const handleGetInfoAboutPerson = async (req: RequestPerson, reply: FastifyReply) => {


	const passport_number: string | undefined = req.query.passport_number
	const driver_license: string | undefined = req.query.driver_license

	console.log(passport_number)

	if (info_current_user?.username !== undefined && info_current_user?.password !== undefined && info_current_user?.whoami !== undefined) {

		const response = service_business.getInfoAboutPerson(passport_number, driver_license, info_current_user.username, info_current_user.password)
		if (await response == "No") {
			reply = reply.code(400).send({
				problem: "Need correct request"
			})
			return reply

		} else {

			return response;
		}
	}
	else {
		reply = reply.code(500).send({
			problem: "oy no"
		})
		return reply
	}

}

export const handleGetProtocol = async (req: RequestProtocol, reply: FastifyReply) => {


	
	if (info_current_user?.username !== undefined && info_current_user?.password !== undefined && info_current_user?.whoami !== undefined) {

		console.log(req.query.case_id)

		const response  = await service_business.getInfoAboutProtocol(req.query.case_id, req.query.vin, req.query.police_id, req.query.passport_number,
			info_current_user.username, info_current_user.password, info_current_user.whoami);

		console.log("response in controller")
		console.log(response.length)
		if (response === "No") {

			reply = reply.code(400).send({
				problem: "Need correct request"
			})
			return reply

		} else if (response === "no perm") {
			return reply.code(403).send("Dont`t have permissions")
		}
		else {

			return response;
		}
	}
	else {
		reply = reply.code(500).send({
			problem: "oy no"
		})
		return reply
	}





}


export const handlePostProtocol = async (req: RequestPostProtocol, reply: FastifyReply) => {


	const newProto: newProtocol = reqPostProtocolValidator(req);


	if (info_current_user?.username !== undefined && info_current_user?.password !== undefined && info_current_user?.whoami !== undefined) {

		console.log(req.body)

		const response = await service_business.postNewProtocol(newProto, info_current_user.username, info_current_user.password);

		if (response !== "ok") {

			reply = reply.code(500).send({
				problem: "Server error, sorry"
			})
			return reply

		} else {

			return response;
		}
	}
	else {
		reply = reply.code(400).send({
			problem: "oy no"
		})
		return reply
	}





}


export const handlePostAccConnection = async (req: RequestPostAccConn, reply: FastifyReply) => {

	if (info_current_user?.username !== undefined && info_current_user?.password !== undefined && info_current_user?.whoami !== undefined) {

		console.log(req.body)
		await service_business.postNewAccConnection(req.body, info_current_user.username, info_current_user.password).then((response) => {
			if (response != 'ok') {
				reply = reply.code(500).send({
					problem: "Server Error"
				})
				return reply

			} else {

				console.log("contr have: ")
				console.log(response)
				return reply.send(response);
			}


		})

	}
	else {
		reply = reply.code(400).send({
			problem: "oy no"
		})
		return reply
	}





}
export const handleUpdateFineStatus = async (req: RequestPayFine, reply: FastifyReply) => {

	if (info_current_user?.username !== undefined && info_current_user?.password !== undefined && info_current_user?.whoami !== undefined) {


		await service_business.putFineStatus(req.body, info_current_user.username, info_current_user.password).then((response) => {


			switch (response) {
				case 'ok':
					reply = reply.code(200).send("successful payment")
					return reply

				case 'payment not true':
					reply = reply.code(400).send("doesn't match payment")
					return reply
				case 'already payed':
					reply = reply.code(400).send("already payed")
					return reply
				case 'not exists fine':
					reply = reply.code(400).send("not correct fine object")
					return reply
				case 'error':
					reply = reply.code(500).send("Server")
					return reply
			}

		})

	}
	else {
		reply = reply.code(400).send({
			problem: "oy no"
		})
		return reply
	}





}


export const handleGetAccConnection = async (req: FastifyRequest, reply: FastifyReply) => {

	if (info_current_user?.username !== undefined && info_current_user?.password !== undefined && info_current_user?.whoami !== undefined) {

		console.log(req.body)
		await service_business.getInfoLinkPerson(info_current_user.username, info_current_user.password).then((response) => {

			console.log(response)
			return reply.send(response);

		})

	}
	else {
		reply = reply.code(400).send({
			problem: "oy no"
		})
		return reply
	}

}

export const handleDeleteAccConnection = async (req: RequestDeleteAccConn, reply: FastifyReply) => {

	if (info_current_user?.username !== undefined && info_current_user?.password !== undefined && info_current_user?.whoami !== undefined) {

		await service_business.deleteAccToPersonConnect(req.body.passport_number, info_current_user.username, info_current_user.password).then((response) => {

			if (response !== 'ok') {

				return reply.send(response);
			} else {
				return reply.send("you deleted link, dear " + info_current_user?.username);
			}

		})

	}
	else {
		reply = reply.code(400).send({
			problem: "not correct account password"
		})
		return reply
	}

};

export const handleGetComplaint = async (req: RequestGetComplaint, reply: FastifyReply) => {

	
	if (info_current_user?.username !== undefined && info_current_user?.password !== undefined && info_current_user?.whoami !== undefined) {

		const complM: getComplaintMeth = req.query;

		const response: complaint[]|"no perm"|  "The correct value is not presented " = await service_business.getInfoComplaint(complM,info_current_user.username, info_current_user.password, info_current_user.whoami);

		
		if (response === 'The correct value is not presented ') {
			return  reply.code(400).send(response)

		} else if (response === "no perm") {
			return reply.code(403).send("Dont`t have permissions")
		}
		else {
			return response;
		}
	}
	else {
		return reply.code(500).send("Server Error")
		
	}





}

export const handlePostComplaint = async (req: RequestPostComplaint, reply: FastifyReply) => {


	const newCompl: newComplaint = reqPostComplaintValidator(req);


	if (info_current_user?.username !== undefined && info_current_user?.password !== undefined && info_current_user?.whoami !== undefined) {

		console.log(req.body)

		const response = await service_business.postNewComplaint(newCompl, info_current_user.username, info_current_user.password);

		if (response !== "ok") {

			reply = reply.code(500).send({
				problem: "Server error, sorry"
			})
			return reply

		} else {

			return response;
		}
	}
	else {
		reply = reply.code(400).send({
			problem: "oy no"
		})
		return reply
	}





 }



 export const handleUpdateComplaintStatus = async (req: RequestUpdateComplaint, reply: FastifyReply) => {

   const dataForUpdateCompl: answerOnComplaint = reqUpdateComplaintValidator(req)


	if (info_current_user?.username !== undefined && info_current_user?.password !== undefined && info_current_user?.whoami !== undefined) {


		await service_business.putComplaintStatus(req.body, info_current_user.username, info_current_user.password).then((response) => {


			return reply.code(200).send(response);

		})

	}
	else {
		reply = reply.code(400).send({
			problem: "oy no"
		})
		return reply
	}





}

export const handleDeleteComplaint = async (req: RequestDeleteComplaint, reply: FastifyReply) => {

	if (info_current_user?.username !== undefined && info_current_user?.password !== undefined && info_current_user?.whoami !== undefined) {

		await service_business.deleteComplaint(req.body.complaint_id, info_current_user.username, info_current_user.password).then((response) => {

			console.log("enter")
				return reply.send(response+"\nyou deleted your beautifull complaint, dear " + info_current_user?.username).code(200);
			

		})

		console.log("gg")
	}
	else {
		reply = reply.code(400).send({
			problem: "not correct account password"
		})
		return reply
	}


};

export const handleDeleteProtocol = async (req: RequestDeleteProtocol, reply: FastifyReply) => {

	if (info_current_user?.username !== undefined && info_current_user?.password !== undefined && info_current_user?.whoami !== undefined) {

		await service_business.deleteProtocol(req.body.case_id, info_current_user.username, info_current_user.password).then((response) => {

				return reply.send(response+"\nyou deleted your beautifull protocol, dear " + info_current_user?.username).code(200);
			

		})

	}
	else {
		reply = reply.code(400).send({
			problem: "not correct account password"
		})
		return reply
	}


};

export default {
	handleDeleteProtocol,
	handleDeleteComplaint,
	handleUpdateFineStatus,
	handleGetUnfoAdboutCar,
	handleGetInfoAboutPerson,
	handleGetProtocol,
	handleGetArticle,
	handlePostAccConnection,
	handlePostProtocol,
	handleGetAccConnection,
	handleDeleteAccConnection,
	handleGetComplaint,
	handlePostComplaint,
	handleUpdateComplaintStatus
}
