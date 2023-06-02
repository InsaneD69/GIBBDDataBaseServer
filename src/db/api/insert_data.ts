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
export async function dbpostPersonForAccount(sequelize: Sequelize, username: string, passport_number: number) {
    
    const response =  await sequelize.query(
        'INSERT into account_to_person (username, passport_number) '+
        'values(:ins_username,:ins_passport_number)',
        {
        replacements: { 
            ins_username:username,
            ins_passport_number: passport_number
        },
        type: QueryTypes.INSERT
        } 

    ) ;

    console.log(response)


    return response;
}