//type selectReq = {column:string[],table:string[]}

import { articles, car_user, fine, importantInfoAboutCar } from "../../db/db_api/models/db_models"

export type area = {
    area_id: string,
    address: string,
    area_name: string
}

export type articleInfo = {
    article_id: string,
    description: string,
    price : { start: number, end: number}| null,
    deprivation_months: { start: number, end: number} | null


}

export type OneAreaAllInfo = {
    area_id: string,
    address: string,
    area_name: string
}

export type importantInfoAboutCar_plus_car_user = {
    
    car: importantInfoAboutCar,
    car_users: car_user[]
}
export type person = {
    
    passport_number : string,
    driver_license: number,
    date_of_issue: Date,
    phone_number: string,
    job_info: string,
    person_name: string,
    surname: string,
    patronymic: string,

    date_of_birth: Date,
    place_of_registr: string
}
export type newProtocol = {

    // from protocol
    vin: string,
    passport_number: string,
    date_of_case: string,
    case_address: string,
    camera_id: number | null,
    case_reason: string,
    case_verdict: string,
    police_id: string,

    //from person
    person_name: string,
    surname: string,
    patronymic: string,
    phone_number: string,
    job_info: string,

    //from passport
    date_of_birth: Date,
    unit: string,
    place_of_registr: string,

    
    //from policeman
    full_name: string,
    post: string,
    rank: string,

    //from car
    mark_and_model: string,


    //from gosnumber
    number: string,
    region_code: number,


    //from case_article
    articles: articles[],

    fines: fine[]
    

}


export type protocol = {

    // from protocol
    case_id: number
    vin: string,
    passport_number: string,
    date_of_case: string,
    case_address: string,
    camera_id: string,
    case_reason: string,
    case_verdict: string,
    police_id: string,

    //from person
    person_name: string,
    surname: string,
    patronymic: string,
    phone_number: string,
    job_info: string,

    //from passport
    date_of_birth: Date,
    unit: string,
    place_of_registr: string,

    
    //from policeman
    full_name: string,
    post: string,
    rank: string,

    //from car
    mark_and_model: string,


    //from gosnumber
    number: string,
    region_code: number,


    //from case_article
    articles: articles[],

    fines: fine[]
    

}

export type dataForAddPerson = {
    passport_number: number
}

export type dataForPayFine = {
    case_id: number,
    payment: number

}

export type dataAboutConnectedPerson = {
    name: string,
    surname: string,
    patronymic: string
    passport_number: number

}
export type newComplaint = {
    case_id: number,
    passport_number: number,
    full_justification: boolean,
    was_a_driver: boolean,
    reason_text: string,

}

export type answerOnComplaint = {
    complaint_id: number,
    verdict: string,
    verdict_boolean: string
}


export type getComplaintMeth = {
        complaint_id: number | undefined | null | '',
        case_id: number | undefined | null | '',
        passport_number: number | undefined | null | ''
}