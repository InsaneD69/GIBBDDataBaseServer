import { FastifyReply, FastifyRequest } from "fastify";
import { RequestToken } from "./request_type";
import fastify from "../app";


export let tokenStore = new Map<string,string>();

export const handleGetToken = async (req:  RequestToken , reply: FastifyReply) => {
	
	const username: string = req.body.username
	const password: string = req.body.password

	const token = fastify.jwt.sign({ 
        username: username,
        password: password
    });

    tokenStore.set(
        username,"Bearer "+token
    )
	
	return  reply.send(token);
	
}






export default {handleGetToken
	
}