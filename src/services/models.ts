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