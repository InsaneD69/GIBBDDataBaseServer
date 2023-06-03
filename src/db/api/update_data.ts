import { QueryTypes, Sequelize } from "sequelize";
import { dbAnswerOnFinePay } from "./models/db_models";
import { answerOnComplaint } from "../../services/models";

export async function dbupdateFineStatus(sequelize: Sequelize, case_id: number,  payment: number) {
    
    const response:dbAnswerOnFinePay[] =  await sequelize.query(
        'Select paymentFine(:case_id, :payment) ',
        {
        replacements: { 
            case_id: case_id,
            payment: payment
        },
        type: QueryTypes.SELECT
        } 

    );

    console.log(response)


    return response;
}


export async function dbupdateComplaintStatus(sequelize: Sequelize, ansCompl:answerOnComplaint) {
    
    const response =  await sequelize.query(
        'Update complaint '+
        'SET date_of_review = (SELECT CURRENT_DATE), '+
        ' verdict = :verdict, '+
        ' verdict_boolean = :verdict_boolean '+
        ' WHERE complaint_id = :complaint_id;',
        {
        replacements: { 
            verdict:ansCompl.verdict,
            verdict_boolean:ansCompl.verdict_boolean,
            complaint_id:ansCompl.complaint_id
        },
        type: QueryTypes.UPDATE
        } 

    );

    console.log(response)


    return response;
}