import { QueryTypes, Sequelize } from "sequelize";
import { dbconnectionCitizen, dbconnectionCitizenClient } from "../db/connect";

import { dbCheckEmail, dbCheckPhone, dbCheckUser } from "../db/db_api/select_data";
import { dbpostNewCitizen } from "../db/db_api/insert_data";
import { dbDeleteAccToPersonConnect, dbDeleteCitizenAccount } from "../db/db_api/delete_data";
import { Md5 } from "ts-md5";


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



export const deleteCitizenAccount = async (username: string): Promise<'ok'| 'error'> => {

	const sequelize = new Sequelize(dbconnectionCitizen);

    const response = await dbDeleteCitizenAccount(sequelize,username);

    switch(response){

		case "ok":
			return 'ok'
		case "error":
			return 'error'
	}

}


export const deleteAccToPersonConnect = async (passport_number: number, username: string, password: string): Promise<"ok"|"error"> => {

	const sequelize = new Sequelize(dbconnectionCitizenClient(username, Md5.hashStr(password)));


	const response = await dbDeleteAccToPersonConnect(sequelize, passport_number);

	switch(response){

		case "ok":
			return 'ok'
		case "error":
			return 'error'
	}
	
	
}


export default {

    registerCitizenAccount,
    deleteCitizenAccount,
    deleteAccToPersonConnect 

}