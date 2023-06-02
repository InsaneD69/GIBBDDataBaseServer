
import { QueryTypes, Sequelize } from 'sequelize';
import { articles, car_user,  fine,  importantInfoAboutCar, infoAboutPerson } from "./models/db_models"
import { protocol } from '../../services/models';
import { dbconnectionPoliceman } from '../connect';



// export async function TESTgetAllFromArticle(username:string, password:string){

//     console.log("Im in reqtodb")
//     const sequelize = new Sequelize(dbconnectionPolicemanClient(username,password));

//     const response : article[]=  await sequelize.query(
//         'SELECT * FROM article',{
//             type: QueryTypes.SELECT
//         } 


//     ) 

//     return response;
// }

// export async function dbgetInfoAboulAllCamera(){

//     console.log("Im in reqtodb")
//     const sequelize = new Sequelize(dbconnectionAdmin);

//     const response: camera[] = await sequelize.query(
//         'SELECT camera.camera_id, camera.certificate, area.area_name'+ 
//         ' FROM camera'+
//         ' join area on area.area_id = camera.area_id',{
//             type: QueryTypes.SELECT
//         }

//     )

//     console.log(response)

//     return response;
// }

export async function dbgetInfoAboutCarVIN(sequelize: Sequelize, vin: string) {

    const response: importantInfoAboutCar[] = await sequelize.query(
        'SELECT  car.vin, person.driver_license,car.mark_and_model,' +
        'car.color,car.car_type,car.category,car.engine_info,car.sts_num,car.pts_num,' +
        'person.person_name,person.surname,person.patronymic,' +
        'gosnumber.number,gosnumber.region_code ' +
        ' FROM car' +
        ' join gosnumber on gosnumber.vin = car.vin' +
        ' join sts on car.sts_num = sts.sts_id' +
        ' join person on person.passport_number = sts.passport_number' +
        ' WHERE car.vin = \'' + vin + "\'", {
        type: QueryTypes.SELECT
    }

    )
   

    console.log(response)

    return response;
}
export async function dbgetInfoAboutCarGOSNUMBER(sequelize: Sequelize, number: string, region_code: number) {

    const response: importantInfoAboutCar[] = await sequelize.query(
        'SELECT  car.vin, person.driver_license,car.mark_and_model,' +
        'car.color,car.car_type,car.category,car.engine_info,car.sts_num,car.pts_num,' +
        'person_name,person.surname,person.patronymic,' +
        'gosnumber.number,gosnumber.region_code ' +
        ' FROM car' +
        ' join gosnumber on gosnumber.vin = car.vin' +
        ' join sts on car.sts_num = sts.sts_id' +
        ' join person on person.passport_number = sts.passport_number' +
        ' WHERE gosnumber.number = \'' + number + "\'" +
        ' AND gosnumber.region_code = \'' + region_code + "\'", {
        type: QueryTypes.SELECT
    }

    )

    console.log(response)

    return response;
}


export async function dbgetInfoAboutCar_userVIN(sequelize: Sequelize, vin: string) {

    const response: car_user[] = await sequelize.query(
        'SELECT person.person_name,person.surname,person.patronymic,' +
        ' car_user.license_number' +
        ' FROM car_user' +
        ' join person on person.driver_license = car_user.license_number ' +
        'WHERE car_user.vin = \'' + vin + '\'', {
        type: QueryTypes.SELECT
    }

    )

    console.log(response)

    return response;
}


export async function dbgetInfoAboutPerson(sequelize: Sequelize, findVar: string, whoIs: "passport_number" | "driver_license") {

    const response: infoAboutPerson[] = await sequelize.query(
        'SELECT person.passport_number ,person.driver_license,driver_license.date_of_issue,' +
        ' person.phone_number,person.job_info,person.person_name,person.surname,' +
        ' person.patronymic,passport.date_of_birth,passport.place_of_registr' +
        ' FROM person' +
        ' join passport using(passport_number) ' +
        ' join driver_license on person.driver_license = driver_license.license_number  ' +
        'WHERE person.' + whoIs + ' = \'' + findVar + '\'', {
        type: QueryTypes.SELECT
    }

    )

    console.log(response)

    return response;
}



export async function dbgetInfoAboutProtocol(sequelize: Sequelize, using_var: number| string, whatVar: "case_id" | "vin" | "police_id" | "passport_number") {
   
 
    const response: protocol[] = await sequelize.query(
        'SELECT  protocol.case_id, protocol.vin, protocol.passport_number, ' +
        'protocol.date_of_case, protocol.case_address, protocol.camera_id, ' +
        'protocol.case_reason, protocol.case_verdict, protocol.police_id, ' +
        'person.person_name,person.surname,person.patronymic, ' +
        'person.phone_number,person.job_info, ' +
        'passport.date_of_birth, passport.unit, passport.place_of_registr, ' +
        'policeman.full_name, policeman.post,  policeman.rank, ' +
        'car.mark_and_model, ' +
        'gosnumber.number, gosnumber.region_code ' +
        ' FROM protocol' +
        ' join passport using(passport_number) ' +
        ' join person using(passport_number) ' +
        ' join policeman using(police_id) ' +
        ' join car using(vin) ' +
        ' join gosnumber using(vin) ' +
        'WHERE '+whatVar+' = :using_var; ', {
            replacements: { 
                
                using_var :using_var
            }, 
            type: QueryTypes.SELECT 
        }

    )
    console.log("response in select")
    console.log(response)
    
    
    return response;
}

export async function dbgetInfoAboutProtocolArticle(sequelize: Sequelize, case_id: number) {

    const response: articles[] = await sequelize.query(
        'SELECT  case_article.article_id ' +
        ' FROM case_article ' +
        'WHERE case_id = :using_var; ', { 
            replacements: {  
                using_var: case_id
            }, 
            type: QueryTypes.SELECT 
        }

    )
	console.log("response in selectart")

    console.log(response)
   
    return response;
};

export async function dbgetInfoAboutProtocolFine(sequelize: Sequelize, case_id: number) {

    const response: fine[] = await sequelize.query(
        'SELECT  date_start, date_end,date_payment,sum ' +
        ' FROM fine ' +
        'WHERE case_id = :using_var; ', { 
            replacements: {  
                using_var: case_id
            }, 
            type: QueryTypes.SELECT 
        }

    )
	console.log("response in selectart")

    console.log(response)
   
    return response;
};

export async function dbCheckUser(sequelize: Sequelize, username: string) {

    const response = await sequelize.query(
        'SELECT rolname ' +
        ' FROM pg_catalog.pg_roles ' +
        'WHERE rolname = :username', { 
            replacements: {  
                username: username
            }, 
            type: QueryTypes.SELECT 
        }

    )


    return response;
}

export async function dbCheckPhone(sequelize: Sequelize, phone_number: number) {

    const response = await sequelize.query(
        'SELECT phone_number ' +
        ' FROM citizen_account ' +
        'WHERE phone_number = :cheking_phone_number;', { 
            replacements: {  
                cheking_phone_number: phone_number
            }, 
            type: QueryTypes.SELECT 
        }

    )


    return response;
}

export async function dbCheckEmail(sequelize: Sequelize, email: string) {

    const response = await sequelize.query(
        'SELECT email ' +
        ' FROM citizen_account ' +
        'WHERE email = :cheking_email;', { 
            replacements: {  
                cheking_email: email
            }, 
            type: QueryTypes.SELECT 
        }

    )

    return response;
}







