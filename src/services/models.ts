//type selectReq = {column:string[],table:string[]}

import { car_user, importantInfoAboutCar } from "../db/api/models/db_models"

export type area = {
    area_id: string,
    address: string,
    area_name: string
}

export type article = {
    article_id: string,
    description: string,
    price : { start: number, end: number}
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
    region_code: number


    //from article
    article_id: string,
    description: string


}