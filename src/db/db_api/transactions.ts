import { QueryTypes, Sequelize } from "sequelize";
import { newProtocol, protocol } from "../../client_api/models/response_models";

export async function dbCreateProtocol(sequelize: Sequelize, protocol: newProtocol) {

    const t = await sequelize.transaction();
    try {
        let cur_case_id: any;
        try {
            cur_case_id = await sequelize.query('INSERT into protocol ( vin, passport_number, date_of_case, case_address, camera_id, case_reason, police_id, case_verdict) ' +
                'values(:ins_vin, :passport_number, :date_of_case, :case_address, :camera_id, :case_reason, :police_id, :case_verdict) RETURNING case_id', {
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
                transaction: t,
                raw: true,

            });


        } catch (error) {
            console.log(error)
            await t.rollback();
            return 'error';

        }


        cur_case_id = cur_case_id[0][0].case_id;
        protocol.articles.forEach((one_article) => { console.log(one_article.article_id) })

        for (const one_article of protocol.articles) {

            try {

                const r = await sequelize.query('INSERT into case_article (case_id, article_id) ' +
                    'values (:case_id,:article_id)', {
                    replacements: {
                        case_id: cur_case_id,
                        article_id: one_article.article_id
                    },
                    type: QueryTypes.INSERT,
                    transaction: t,
                    raw: true
                });

            } catch (error) {
                console.log(error)
                t.rollback();
                return 'error';

            }
        }

        for (const one_fine of protocol.fines) {

            try {
                console.log("Starting ins fine 1")
                const r = await sequelize.query('INSERT into fine (case_id,date_end,date_start,date_payment,sum) ' +
                    'values (:case_id,:date_end,:date_start,:date_payment,:sum)', {
                    replacements: {
                        case_id: cur_case_id,
                        date_end: one_fine.date_end,
                        date_start: one_fine.date_start,
                        date_payment: one_fine.date_payment,
                        sum: one_fine.sum
                    },
                    type: QueryTypes.INSERT,
                    transaction: t,
                    raw: true
                });

            } catch (err) {
                console.log(err)
                t.rollback();
                return 'error';

            }
        }


        await t.commit();

        return "ok";
    }
    catch (err) {
        console.log(err)
        t.rollback();
        return 'error';
    }
}