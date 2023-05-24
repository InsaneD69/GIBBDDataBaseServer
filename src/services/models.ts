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