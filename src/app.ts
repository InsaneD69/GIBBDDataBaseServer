import jwt from '@fastify/jwt';
import { Router, AuthRouter } from "./route";
import fastifyJwt from '@fastify/jwt';

const fastify = require('fastify')({
	logger: true
});

fastify.register(jwt, { secret: process.env.JWT_SECRET }),
fastify.register(Router, { prefix: "/api" }),
fastify.register(AuthRouter, { prefix: "/auth" }),

fastify.listen({ port: 8080, host: '0.0.0.0' }, (err: any) => {
	if (err) throw err
});









// import fastify, { FastifyServerOptions } from "fastify";
// import Router from "./route";
// import AuthRouter from "./route";


// const App = (options: FastifyServerOptions) => {
// 	const app = require('fastify')()

// 	app.register(require('@fastify/jwt'), {
// 	  secret: process.env.JWT_SECRET
// 	})

// 	// app.post('/signup', (req, reply) => {
// 	// 	// some code
// 	// 	const token = app.jwt.sign({ payload })
// 	// 	reply.send({ token })
// 	//   })

// 	//app.register(AuthRouter, { prefix: "/auth" });

//     app.register(Router, { prefix: "/api" });
// 	return app
// }
export default fastify;