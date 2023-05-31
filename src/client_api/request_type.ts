import { FastifyRequest } from "fastify";


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
}>

// export type RequestWithIdArticle = FastifyRequest<{
// 	Params: { id: string };
// }>;


// export type UpdateArticleRequest = FastifyRequest<{
// 	Params: { id: string };
// 	Body: {
// 		title?: string | undefined;
// 		text?: string | undefined;
// 		type?: string | undefined;
// 	};
// }>;

// export type ArticleCreateRequest = FastifyRequest<{
// 	Body: {
// 		title?: string | undefined;
// 		text?: string | undefined;
// 		type?: string | undefined;
// 	};
// }>;