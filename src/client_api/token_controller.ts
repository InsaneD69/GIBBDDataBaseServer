import { FastifyReply, FastifyRequest } from "fastify";
import { RequestToken } from "./request_type";
import fastify from "../app";
import { info_current_user } from "../route";
import { testCredentialsToDB } from "../db/api/test_connection";

export let tokenStore = new Map<string, string>();

export const handleGetTokenP = async (req: RequestToken, reply: FastifyReply) => {

   
    if (req.body.username !== undefined && req.body.password !== undefined) {


        const a: any = await testCredentialsToDB(req.body.username , req.body.password, "policeman")
        console.log("ApiContr")
        console.log(a)
    }
    else {
        reply = reply.code(500).send({
            problem: "oy no"
        })
        
        return reply
    }



    const token = fastify.jwt.sign({
        username: req.body.username,
        password: req.body.password,
        whoami: 'policeman'
    });

    tokenStore.set(
        req.body.username, "Bearer " + token
    )

    
   
    return reply.send({ token: token });

}

export const handleGetTokenC = async (req: RequestToken, reply: FastifyReply) => {

    const username: string = req.body.username
    const password: string = req.body.password

    if (info_current_user?.username !== undefined && info_current_user?.password !== undefined && info_current_user?.whoami !== undefined) {

        const a: any = await testCredentialsToDB(info_current_user.username, info_current_user.password, info_current_user.whoami)
        console.log("ApiContr")
        console.log(a)
    }
    else {
        reply = reply.code(500).send({
            problem: "oy no"
        })
        return reply
    }



    const token = fastify.jwt.sign({
        username: username,
        password: password,
        whoami: 'citizen'
    });

    tokenStore.set(
        username, "Bearer " + token
    )

    return reply.send({ token: token });

}

export const handleGetTokenA = async (req: RequestToken, reply: FastifyReply) => {

    const username: string = req.body.username
    const password: string = req.body.password

    if (info_current_user?.username !== undefined && info_current_user?.password !== undefined && info_current_user?.whoami !== undefined) {

        const response: string = await testCredentialsToDB(info_current_user.username, info_current_user.password, info_current_user.whoami)
        console.log("ApiContr")
        console.log(response)
        if(response !== info_current_user.username){
            reply = reply.code(401).send({
                problem: "Not correct auth data"
            })
            return reply
        }
        
        
    }
    else {
        reply = reply.code(500).send({
            problem: "oy no"
        })
        return reply
    }



    const token = fastify.jwt.sign({
        username: username,
        password: password,
        whoami: 'administrator'
    });

    tokenStore.set(
        username, "Bearer " + token
    )

    return reply.send({ token: token });

}




export default {
    handleGetTokenC, handleGetTokenA, handleGetTokenP

}