import { QueryTypes, Sequelize } from "sequelize";


export async function dbpostNewCitizen(sequelize: Sequelize, username: string, password: string, email: string, phone_number: number) {
    
    const response =  await sequelize.query(
        'INSERT into citizen_account (email, phone_number, citizen_password,username) '+
        'values(:email,:phone_number,:citizen_password,:username)',
        {
        replacements: { 
            email:email,
            phone_number: phone_number,
            citizen_password: password,
            username: username

        },
        type: QueryTypes.INSERT
        } 

    ) ;

    console.log(response)


    return response;
}