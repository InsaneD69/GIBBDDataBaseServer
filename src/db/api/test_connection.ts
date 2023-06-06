import { Sequelize, QueryTypes } from "sequelize";
import {dbconnectionCitizenClient} from "../connect";
import {Md5} from 'ts-md5'
import { waitUsename } from "./models/db_models";

export async function testCredentialsToDB(login:string,password:string, who: "policeman"| "citizen" | "administrator"){

    const passwordmd = Md5.hashStr(password);
    console.log(passwordmd)
    console.log(login)
    console.log(who)
    const sequelize = new Sequelize(dbconnectionCitizenClient(login,Md5.hashStr(password)));

    const response : waitUsename[]=  await sequelize.query(
        'SELECT pg_user.usename '
        +'FROM  pg_auth_members join  pg_user on  pg_auth_members.member = pg_user.usesysid '
        +'  WHERE  pg_user.usename = :user_name and roleid = ( '
            +'select usesysid from pg_user '
            +'   where usename = :role_name '
            +');',{
                replacements: { 
                    user_name: login,
                    role_name: who
                },
                type: QueryTypes.SELECT
            } 

    ) 

            console.log(response )
    return response[0].usename;
}
