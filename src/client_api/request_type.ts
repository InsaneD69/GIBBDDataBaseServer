import { FastifyRequest } from "fastify";

//name
export type RequestCar = FastifyRequest<{
	Body: {
        vin?: string | undefined;
        gosnumber?: string | undefined;
        region_code?: number| undefined;
    };
}>;


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