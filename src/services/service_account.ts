import { QueryTypes, Sequelize } from "sequelize";
import { dbconnectionCitizen } from "../db/connect";

import { dbCheckEmail, dbCheckPhone, dbCheckUser } from "../db/api/select_data";
import { dbpostNewCitizen } from "../db/api/insert_data";


export const registerCitizenAccount = async (username: string, password: string,email: string, phone_number: number)
: Promise<'double username'| 'ok'| 'double email'| 'double phone number'> => {

	const sequelize = new Sequelize(dbconnectionCitizen);

    const resq = await dbCheckUser(sequelize, username)
    
    if((await dbCheckUser(sequelize, username)).length !== 0){
        return 'double username'
    }
    if((await dbCheckEmail(sequelize, email)).length !== 0){
        return 'double email'
    }
    if((await dbCheckPhone(sequelize, phone_number)).length !== 0){
        return 'double phone number'
    }


    const response_reg = await dbpostNewCitizen(sequelize,username, password,email, phone_number);

    console.log(response_reg)


    return 'ok'
   
    

}

export default {

    registerCitizenAccount

}