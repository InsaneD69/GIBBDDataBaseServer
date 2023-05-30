import { FastifyReply, FastifyRequest } from "fastify";
import { RequestToken } from "./request_type";
import fastify from "../app";
import { info_current_user } from "../route";
import { testCredentialsToDB } from "../db/api/test_connection";
import { waitUsename } from "../db/api/models/db_models";


export let tokenStore = new Map<string, string>();




export const handleGetTokenP = async (req: RequestToken, reply: FastifyReply) => {

    const username: string = req.body.username
    const password: string = req.body.password

    if (info_current_user?.username !== undefined && info_current_user?.password !== undefined) {

        const a: any = await testCredentialsToDB(info_current_user.username, info_current_user.password, "policeman")
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
        password: password
    });

    tokenStore.set(
        username, "Bearer " + token
    )

    return reply.send({ token: token });

}

export const handleGetTokenC = async (req: RequestToken, reply: FastifyReply) => {

    const username: string = req.body.username
    const password: string = req.body.password

    if (info_current_user?.username !== undefined && info_current_user?.password !== undefined) {

        const a: any = await testCredentialsToDB(info_current_user.username, info_current_user.password, "citizen")
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
        password: password
    });

    tokenStore.set(
        username, "Bearer " + token
    )

    return reply.send({ token: token });

}

export const handleGetTokenA = async (req: RequestToken, reply: FastifyReply) => {

    const username: string = req.body.username
    const password: string = req.body.password

    if (info_current_user?.username !== undefined && info_current_user?.password !== undefined) {

        const response: string = await testCredentialsToDB(info_current_user.username, info_current_user.password, "administrator")
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
        password: password
    });

    tokenStore.set(
        username, "Bearer " + token
    )

    return reply.send({ token: token });

}




export default {
    handleGetTokenC, handleGetTokenA, handleGetTokenP

}