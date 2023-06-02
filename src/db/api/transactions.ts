import { QueryTypes, Sequelize } from "sequelize";
import { newProtocol, protocol } from "../../services/models";
import { currentId } from "./models/db_models";

export async function dbCreateProtocol(sequelize: Sequelize, protocol: newProtocol) {

    const response = await sequelize.transaction(async transaction => {

        

        try {

             await sequelize.query('INSERT into protocol ( vin, passport_number, date_of_case, case_address, camera_id, case_reason, police_id, case_verdict) '+
            'values(:ins_vin, :passport_number, :date_of_case, :case_address, :camera_id, :case_reason, :police_id, :case_verdict)',{
                replacements: { 
                    ins_vin: protocol.vin,
                    passport_number: protocol.passport_number,
                    date_of_case: protocol.date_of_case,
                    case_address: protocol.case_address,
                    camera_id: protocol.camera_id,
                    case_reason: protocol.case_reason,
                    police_id: protocol.police_id,
                    case_verdict: protocol.case_verdict
                   
                },
                type: QueryTypes.INSERT,
                transaction,
                raw: true
            } );

            const currval : currentId[] = await sequelize.query('SELECT currval(protocol_case_id_seq)',{
        
                type: QueryTypes.SELECT,
                transaction,
                raw: true
            } );

            console.log("currval")
            console.log(currval)
            console.log(currval[0].currval)

             protocol.articles.forEach(async(one_article)=>{
                await sequelize.query('INSERT into case_article (case_id, article_id) '+
                'values(:case_id,:article_id)',{
                    replacements: { 
                        case_id: currval[0].currval,
                        article_id: one_article.article_id
                    },
                    type: QueryTypes.INSERT,
                    transaction,
                    raw: true
                } )
            }),

            protocol.fines.forEach(async (one_fine) => {
                   await sequelize.query('INSERT into fine (case_id,date_end,date_start,date_payment,sum) ' +
                        'values (:case_id,:date_end,:date_start,:date_payment,:sum)', {
                        replacements: {
                            case_id: currval[0].currval,
                            date_end: one_fine.date_end,
                            date_start: one_fine.date_start,
                            date_payment: one_fine.date_payment,
                            sum: one_fine.sum
                        },
                        type: QueryTypes.INSERT,
                        transaction,
                        raw: true
                    });
                }),

            transaction.commit();
            

        } catch (error) {
            console.log(error)
            transaction.rollback();
           return `TRANSACTION_ERROR`;
        }

    })

    return response;
}