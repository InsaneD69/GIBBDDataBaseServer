import { QueryTypes, Sequelize } from "sequelize";


export async function dbDeleteCitizenAccount(sequelize: Sequelize, username: string){

    const response = await sequelize.query(
        'DELETE' +
        ' FROM citizen_account ' +
        ' WHERE username = :del_username;', { 
            replacements: {  
                del_username: username
            }, 
            type: QueryTypes.DELETE
        }

    )




    return response
}