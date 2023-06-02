import { QueryTypes, Sequelize } from "sequelize";
import { dbAnswerOnFinePay } from "./models/db_models";

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