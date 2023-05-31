import { FastifyReply } from "fastify";
import { RequestToken } from "./request_type";
import { tokenStore } from "./token_controller";
import { info_current_user } from "../route";



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
export default {
    handleLogout
}