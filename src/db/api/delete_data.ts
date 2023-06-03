import { QueryTypes, Sequelize } from "sequelize";


export async function dbDeleteCitizenAccount(sequelize: Sequelize, username: string){
    try{
        await sequelize.query(
            'DELETE' +
            ' FROM citizen_account ' +
            ' WHERE username = :del_username;', { 
                replacements: {  
                    del_username: username
                }, 
                type: QueryTypes.DELETE
            }

        )

        return "ok";

    }
    catch (err){

        console.log(err);
        return 'error'
    }
}

export async function dbDeleteAccToPersonConnect(sequelize: Sequelize,passport_number: number){


    try{
        await sequelize.query(
            'DELETE' +
            ' FROM account_to_person ' +
            ' WHERE passport_number = :del_passport_number;', { 
                replacements: {  
                    del_passport_number: passport_number
                }, 
                type: QueryTypes.DELETE
            }

        )

        return 'ok';

    }
    catch (err){

        console.log(err);
        return 'error'
    }

}

export async function dbDeleteProtocol(sequelize: Sequelize,case_id: number){

    try{
        await sequelize.query(
            'DELETE' +
            ' FROM protocol ' +
            ' WHERE case_id = :del_case_id;', { 
                replacements: {  
                    del_case_id: case_id
                }, 
                type: QueryTypes.DELETE
            }

        )

        return 'ok';

    }
    catch (err){

        console.log(err);
        return 'error'
    }

}

export async function dbDeleteComplaint(sequelize: Sequelize,complaint_id: number){

    try{
        await sequelize.query(
            'DELETE' +
            ' FROM complaint ' +
            ' WHERE complaint_id = :complaint_id;', { 
                replacements: {  
                    complaint_id: complaint_id
                }, 
                type: QueryTypes.DELETE
            }

        );
        return 'ok';

    }
    catch (err){

        console.log(err);
        return 'error'
    }
   

}