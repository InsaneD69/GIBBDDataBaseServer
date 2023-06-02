import { QueryTypes, Sequelize } from "sequelize";
import { protocol } from "../../services/models";

export async function dbCreateProtocol(sequelize: Sequelize, protocol: protocol) {

    const response = await sequelize.transaction(async transaction => {

        try {
       

            sequelize.query('INSERT into protocol (case_id, vin, passport_number, date_of_case, case_address, camera_id, case_reason, police_id, case_verdict) '+
            'values(:case_id, :vin, :passport_number, :date_of_case, :case_address, :camera_id, :case_reason, :police_id, :case_verdict)',{
                replacements: { 
                    case_id: protocol.case_id,
                    vin:protocol.vin,
                    passport_number:protocol.passport_number,
                    date_of_case:protocol.date_of_case,
                    case_address:protocol.case_address,
                    camera_id:protocol.camera_id,
                    case_reason:protocol.case_reason,
                    police_id:protocol.police_id,
                    case_verdict:protocol.case_verdict
                   
                },
                type: QueryTypes.INSERT,
                transaction,
                raw: true
            } ),

            protocol.articles.forEach((one_article)=>{
                sequelize.query('INSERT into case_article (case_id, article_id) '+
                'values(:case_id,:article_id)',{
                    replacements: { 
                        case_id: protocol.case_id,
                        article_id: one_article.article_id
                    },
                    type: QueryTypes.INSERT,
                    transaction,
                    raw: true
                } )
            }),
            protocol.fines.forEach((one_fine)=>{
                sequelize.query('INSERT into fine (case_id,date_end,date_start,date_payment,sum) '+
                'values(:case_id,:date_end,:date_start,:date_payment,:sum)',{
                    replacements: { 
                        case_id: protocol.case_id,
                        date_end: one_fine.date_end,
                        date_start:one_fine.date_start,
                        date_payment:one_fine.date_payment,
                        sum: one_fine.sum
                    },
                    type: QueryTypes.INSERT,
                    transaction,
                    raw: true
                } )
            }),

            transaction.commit();

        } catch (error) {
            transaction.rollback();
            throw `TRANSACTION_ERROR`;
        }

    })

    return response;
}