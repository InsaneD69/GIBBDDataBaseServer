import { FastifyRequest } from "fastify";
import { articles, fine } from "../db/api/models/db_models";


export type RequestCar = FastifyRequest<{
	Querystring: {
        vin: string | undefined;
        number: string | undefined;
        region_code: number | undefined;
    };
}>;

export type RequestProtocol  = FastifyRequest<{
	Querystring: {
        case_id: number | undefined,
        vin: string | undefined,
        police_id: string | undefined,
        passport_number: string | undefined
    };
}>;
export type RequestPerson= FastifyRequest<{
	Querystring: {
        passport_number: string | undefined;
        driver_license: string | undefined;
    };
}>;


export type RequestToken = FastifyRequest<{
	Body: {
        username: string;
        password: string;
        whoami:"citizen"|"policeman"|"administrator"
    };
}>;

export type RequestWithToken = FastifyRequest<{
	Headers: { authorization: string };
}>
export type RequestRegistrationCitizen = FastifyRequest<{
	Body: { 
        email: string,
        phone_number: number,
        username: string,
        password: string      

    };
}>;
export type RequestDeleteCitizen = FastifyRequest<{
	Headers: { 
        password: string      
    };
}>;

export type RequestPostProtocol = FastifyRequest<{
    Body:{
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
    region_code: number


    //from case_article
    articles: articlesR[],

    fines: fineR[]
    }
}>;
export type articlesR = {
    article_id: string
    }

export type fineR = {
    date_start: Date
    date_end: Date,
    date_payment: Date,
    sum: number
}


export type RequestPostAccConn = FastifyRequest<{

    Body:{

        passport_number: number

    }

}>

export type RequestPayFine = FastifyRequest<{

    Body:{
        case_id: number,
        payment: number
    }

}>

export type RequestDeleteAccConn = FastifyRequest<{

    Body:{

        passport_number: number

    }

}>

export type RequestPostComplaint = FastifyRequest<{

    Body:{

        case_id: number,
        passport_number: number,
        full_justification: boolean,
        was_a_driver: boolean,
        reason_text: string,


    }

}>

export type RequestGetComplaint = FastifyRequest<{

    Querystring:{
        complaint_id: number | undefined | null | '',
        case_id: number | undefined| null| '',
        passport_number: number | undefined| null | ''
    }

}>

export type RequestUpdateComplaint = FastifyRequest<{

    Body:{

        complaint_id: number,
        verdict: string,
        verdict_boolean: string

    }

}>
export type RequestDeleteComplaint = FastifyRequest<{

    Body:{
        complaint_id: number
    }

}>

export type RequestDeleteProtocol = FastifyRequest<{

    Body:{
        case_id: number
    }

}>