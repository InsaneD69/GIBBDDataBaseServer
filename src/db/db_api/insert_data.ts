import { QueryTypes, Sequelize } from "sequelize";
import { newComplaint, newProtocol } from "../../client_api/models/response_models";


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

export async function dbpostNewPersonToAccount(sequelize: Sequelize, username: string,  passport_number: number) {
    
    const response =  await sequelize.query(
        'INSERT into account_to_person (username, passport_number) '+
        'values(:username, :passport_number)',
        {
        replacements: { 
            passport_number: passport_number,
            username: username

        },
        type: QueryTypes.INSERT
        } 

    ) ;

    console.log(response)


    return response;
}

export async function dbpostNewComplaint(sequelize: Sequelize, newCompl: newComplaint) {
    
    const response =  await sequelize.query(
        'INSERT into complaint '+
        '(case_id, passport_number, full_justification,date_of_submission, was_a_driver, reason_text) '+
        'values (:case_id, :passport_number, :full_justification, (SELECT CURRENT_DATE), :was_a_driver, :reason_text)',
        {
        replacements: { 
            case_id: newCompl.case_id,
            passport_number: newCompl.passport_number,
            full_justification: newCompl.full_justification,
            was_a_driver: newCompl.was_a_driver,
            reason_text: newCompl.reason_text,

        },
        type: QueryTypes.INSERT
        } 

    ) ;

    console.log(response)


    return response;
}