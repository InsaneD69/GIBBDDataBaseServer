
import {dbconnectionAdmin} from '../connect'
import { QueryTypes, Sequelize } from 'sequelize';
import {area, article, camera, car_user, importantInfoAboutCar} from "./models/db_models"
import { RequestCar } from '../../client_api/request_type';


export async function TESTgetAllFromArticle(){

    console.log("Im in reqtodb")
    const sequelize = new Sequelize(dbconnectionAdmin);
    
    const response : article[]=  await sequelize.query(
        'SELECT * FROM article',{
            type: QueryTypes.SELECT
        } 

 
    ) 

    return response;
}

export async function dbgetInfoAboulAllCamera(){

    console.log("Im in reqtodb")
    const sequelize = new Sequelize(dbconnectionAdmin);
    
    const response: camera[] = await sequelize.query(
        'SELECT camera.camera_id, camera.certificate, area.area_name'+ 
        ' FROM camera'+
        ' join area on area.area_id = camera.area_id',{
            type: QueryTypes.SELECT
        }

    )

    console.log(response)

    return response;
}

export async function dbgetInfoAboutCarVIN(body: RequestCar){

    console.log("Im in reqtodb")
    const sequelize = new Sequelize(dbconnectionAdmin);
    
    const response: importantInfoAboutCar[] = await sequelize.query(
        'SELECT  car.vin, car.driver_license,car.mark_and_model,'+
        'car.color,car.car_type,car.category,car.engine_info,car.sts_num,car.pts_num,'+
        'person_name,person.surname,person.patronymic,'+
        'gosnumber.gosnumder,gosnumber.region_code '+ 
        ' FROM car'+
        ' join gosnumber on gosnumber.vin = car.vin'+
        ' join person on person.driver_license = car.driver_license'+
        ' WHERE car.vin = '+body.body.vin,{
            type: QueryTypes.SELECT
        }

    )

    console.log(response)

    return response;
}
export async function dbgetInfoAboutCarGOSNUMBER(body: RequestCar){

    console.log("Im in reqtodb")
    const sequelize = new Sequelize(dbconnectionAdmin);
    
    const response: importantInfoAboutCar[] = await sequelize.query(
        'SELECT  car.vin, car.driver_license,car.mark_and_model,'+
        'car.color,car.car_type,car.category,car.engine_info,car.sts_num,car.pts_num,'+
        'person_name,person.surname,person.patronymic,'+
        'gosnumber.gosnumder,gosnumber.region_code '+ 
        ' FROM car'+
        ' join gosnumber on gosnumber.vin = car.vin'+
        ' join person on person.driver_license = car.driver_license'+
        ' WHERE gosnumber.gosnumber = '+body.body.gosnumber +
        ' AND gosnumber.region_code = '+body.body.region_code,{
            type: QueryTypes.SELECT
        }

    )

    console.log(response)

    return response;
}


export async function dbgetInfoAboutCar_userVIN(vin: string){

    console.log("Im in reqtodb")
    const sequelize = new Sequelize(dbconnectionAdmin);
    
    const response: car_user[] = await sequelize.query(
        'SELECT person_name,person.surname,person.patronymic,'+ 
        ' car_user.license_number'+
        ' FROM car_user'+
        ' join person on person.driver_license = car_user.license_number'+
        'WHERE car_user.vin = '+vin,{
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