import { FastifyReply } from "fastify";
import { RequestRegistrationCitizen, RequestToken } from "./request_type";
import { tokenStore } from "./token_controller";
import { info_current_user } from "../route";
import  service_account  from "../services/service_account";



export const handleLogout = async (req: RequestToken, reply: FastifyReply) => {

    console.log(info_current_user?.username)
    console.log(info_current_user?.password)
    console.log(info_current_user?.whoami)

    if (info_current_user?.username !== undefined && info_current_user?.password !== undefined && info_current_user?.whoami !== undefined) {

        tokenStore.delete(
            info_current_user.username
        )
    }
    else {
        reply = reply.code(500).send({
            problem: "oy no"
        })
        return reply
    }

    return reply.send("you logout, dear "+info_current_user.username);

};


export const handleRegisterCitizen = async (req: RequestRegistrationCitizen, reply: FastifyReply) => {

    if (req.body.username !== undefined && req.body.password !== undefined && req.body.email !== undefined && req.body.phone_number !== undefined) {

       await service_account.registerCitizenAccount(req.body.username,req.body.password,req.body.email,req.body.phone_number).then((response)=>{
        
        if( response !== 'ok'){
            
             return reply.send(response);
        } else {
            return reply.send("you register, dear "+req.body.username);
        }
            
       })
   
    }
    else {
        reply = reply.code(400).send({
            problem: "not corrent register data"
        })
        return reply
    }

  


   

};

export default {
    handleLogout,
    handleRegisterCitizen
}