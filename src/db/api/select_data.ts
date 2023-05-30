
import {dbconnectionAdmin, dbconnectionCitizen, dbconnectionPoliceman, dbconnectionPolicemanClient} from '../connect'
import { QueryTypes, Sequelize } from 'sequelize';
import {area, article, camera, car_user, importantInfoAboutCar, infoAboutPerson} from "./models/db_models"
import { RequestCar } from '../../client_api/request_type';
import { Md5 } from 'ts-md5';


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

export async function dbgetInfoAboutCarVIN(vin: string,username:string, password:string){

    console.log("Im in reqtodb")
    const sequelize = new Sequelize(dbconnectionPolicemanClient(username, Md5.hashStr(password)));
    
    const response: importantInfoAboutCar[] = await sequelize.query(
        'SELECT  car.vin, person.driver_license,car.mark_and_model,'+
        'car.color,car.car_type,car.category,car.engine_info,car.sts_num,car.pts_num,'+
        'person.person_name,person.surname,person.patronymic,'+
        'gosnumber.number,gosnumber.region_code '+ 
        ' FROM car'+
        ' join gosnumber on gosnumber.vin = car.vin'+
        ' join sts on car.sts_num = sts.sts_id'+
        ' join person on person.passport_number = sts.passport_number'+
        ' WHERE car.vin = \''+vin+"\'",{
            type: QueryTypes.SELECT
        }

    )

    console.log(response)

    return response;
}
export async function dbgetInfoAboutCarGOSNUMBER(number: string, region_code: number,username:string, password:string){

    console.log("Im in reqtodb")
    const sequelize = new Sequelize(dbconnectionPolicemanClient(username, Md5.hashStr(password)));
    
    const response: importantInfoAboutCar[] = await sequelize.query(
        'SELECT  car.vin, person.driver_license,car.mark_and_model,'+
        'car.color,car.car_type,car.category,car.engine_info,car.sts_num,car.pts_num,'+
        'person_name,person.surname,person.patronymic,'+
        'gosnumber.number,gosnumber.region_code '+ 
        ' FROM car'+
        ' join gosnumber on gosnumber.vin = car.vin'+
        ' join sts on car.sts_num = sts.sts_id'+
        ' join person on person.passport_number = sts.passport_number'+
        ' WHERE gosnumber.number = \''+number+"\'" +
        ' AND gosnumber.region_code = \''+region_code+"\'",{
            type: QueryTypes.SELECT
        }

    )

    console.log(response)

    return response;
}


export async function dbgetInfoAboutCar_userVIN(vin: string,username:string, password:string){

    console.log("Im in reqtodb")
    const sequelize = new Sequelize(dbconnectionPolicemanClient(username, Md5.hashStr(password)));
    
    const response: car_user[] = await sequelize.query(
        'SELECT person.person_name,person.surname,person.patronymic,'+ 
        ' car_user.license_number'+
        ' FROM car_user'+
        ' join person on person.driver_license = car_user.license_number '+
        'WHERE car_user.vin = \''+vin+'\'',{
            type: QueryTypes.SELECT
        }

    )
      

    console.log(response)

    return response;
}
 

export async function dbgetInfoAboutPerson(findVar: string, whoIs: "passport_number" | "driver_license",username:string, password:string){

    console.log("Im in reqtodb")
    const sequelize = new Sequelize(dbconnectionPolicemanClient(username, Md5.hashStr(password)));
    
    const response: infoAboutPerson[] = await sequelize.query(
        'SELECT person.passport_number ,person.driver_license,driver_license.date_of_issue,' +
        ' person.phone_number,person.job_info,person.person_name,person.surname,' +
        ' person.patronymic,passport.date_of_birth,passport.place_of_registr'+
        ' FROM person'+
        ' join passport using(passport_number) '+
        ' join driver_license on person.driver_license = driver_license.license_number  '+
        'WHERE person.'+whoIs+' = \''+findVar+'\'',{
            type: QueryTypes.SELECT
        }

    )

    console.log(response)

    return response;
}
 

// export {TESTgetAllFromArticle};








// const fastify = require('fastify')()
// import dbconnectorAdmin from '../db/connect'
// //import {server} from '../index'



// async function getInfoAboutCountry() {
    
//     await server.register(dbconnectorAdmin);
    
//     await server

//     function onConnect (err: any, client: { query: (arg0: string, arg1: any[], arg2: (err: any, result: any) => void) => void }, release: () => void) {
//         if (err) return console.log(err)
    
//         client.query(
//           'SELECT id, username, hash, salt FROM users WHERE id=$1', [req.params.id],
//           function onResult (err, result) {
//             release()
//             console.log(err || result)
//           }
//         )
//       }
// }

// export {getInfoAboutCountry};