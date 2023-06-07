
import { QueryTypes, Sequelize } from 'sequelize';
import { article, articles, car_user,  complaint,  fine,  importantInfoAboutCar, infoAboutPerson, personToAccount, sumFines } from "./models/db_models"
import { protocol } from '../../client_api/models/response_models';


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
        ' WHERE car.vin = :vin', {
            replacements:{
                vin: vin
            },
            type: QueryTypes.SELECT
        }
    )
   
    console.log(response)

    return response;
}
export async function dbgetInfoAboutCarGOSNUMBER(sequelize: Sequelize, number: string, region_code: number) {

    const response: importantInfoAboutCar[] = await sequelize.query(
        'SELECT  car.vin, person.driver_license, car.mark_and_model, ' +
        'car.color, car.car_type, car.category, car.engine_info,car.sts_num,car.pts_num, ' +
        'person_name, person.surname, person.patronymic, ' +
        'gosnumber.number, gosnumber.region_code ' +
        ' FROM car' +
        ' join gosnumber on gosnumber.vin = car.vin' +
        ' join sts on car.sts_num = sts.sts_id' +
        ' join person on person.passport_number = sts.passport_number' +
        ' WHERE gosnumber.number = :number' +
        ' AND gosnumber.region_code = :region_code', {
            replacements:{
                number: number,
                region_code: region_code
            }, type: QueryTypes.SELECT
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
        'WHERE car_user.vin = :vin', {
            replacements:{
                vin: vin
            }, type: QueryTypes.SELECT
    }

    )

    console.log(response)

    return response;
}


export async function dbgetInfoAboutPerson(sequelize: Sequelize, findVar: string| number, whoIs: "passport_number" | "driver_license") {

    const response: infoAboutPerson[] = await sequelize.query(
        'SELECT person.passport_number ,person.driver_license,driver_license.date_of_issue,' +
        ' person.phone_number,person.job_info,person.person_name,person.surname,' +
        ' person.patronymic,passport.date_of_birth,passport.place_of_registr' +
        ' FROM person' +
        ' join passport using(passport_number) ' +
        ' join driver_license on person.driver_license = driver_license.license_number  ' +
        'WHERE person.' + whoIs + ' = :var', {
            replacements:{
                var: findVar
            },
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
   
    return response;
}

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
	
    
   
    return response;
}

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



export async function dbgetArticles(sequelize: Sequelize) {

    const response: article[] = await sequelize.query(
        'SELECT * ' +
        ' FROM article ', { 
            type: QueryTypes.SELECT 
        }

    )
    
    return response;
}



export async function dbgetAcc_ToPerson(sequelize: Sequelize) {

    const response: personToAccount[] = await sequelize.query(
        'SELECT person_name, surname, patronymic, passport_number ' +
        ' FROM person ', { 
            type: QueryTypes.SELECT 
        }

    )
    
    return response;
}


export async function dbgetInfoAboutComplaint(sequelize: Sequelize, using_var: number, whatVar: "case_id" | "complaint_id" | "passport_number") {
   
 
    const response: complaint[] = await sequelize.query(
        'SELECT  complaint.complaint_id, complaint.case_id, complaint.passport_number, ' +
        'complaint.date_of_submission, complaint.date_of_review, complaint.verdict, complaint.full_justification, complaint.was_a_driver, complaint.reason_text, complaint.verdict_boolean, protocol.case_reason ' +
        ' FROM complaint ' +
        ' join protocol using(case_id) ' +
        'WHERE complaint.'+whatVar+' = :using_var; ', {
            replacements: { 
                
                using_var :using_var
            }, 
            type: QueryTypes.SELECT 
        }

        
    )
    
    return response;
}


export async function dbgetFinesSum(sequelize: Sequelize, passport_number: number) {
    
    const response:sumFines[] =  await sequelize.query(
        'Select count_fines_sum(:passport_number) ',
        {
        replacements: { 
            passport_number: passport_number
        },
        type: QueryTypes.SELECT
        } 

    );

    console.log(response)


    return response;
}


export async function dbgetInfoAboutUnseenComplaint(sequelize: Sequelize) {
    
    const response:complaint[]=  await sequelize.query(
        // 'SELECT  complaint.complaint_id, complaint.case_id, complaint.passport_number, ' +
        // 'complaint.date_of_submission, complaint.date_of_review, complaint.verdict, complaint.full_justification, complaint.was_a_driver, complaint.reason_text, complaint.verdict_boolean, protocol.case_reason ' +
        // ' FROM complaint ' +
        // ' join protocol using(case_id) ' +
        // ' where date_of_review is null ',
        'SELECT * from get_unseen_complaints',
        {
            type: QueryTypes.SELECT
        } 

    );

    console.log(response)


    return response;
}