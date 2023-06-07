import fs from "fs";
import path from "path";
import jwt from '@fastify/jwt';
import {  AccountRouter, ApiAdministratorRouter, ApiCitizenRouter, ApiPoliceRouter, AuthRouter } from "./route";
import cors from '@fastify/cors'
const fastify = require('fastify')({
	http2: true,
	https: {
		allowHTTP1: true, 
		key: fs.readFileSync(path.join(__dirname, "..", "https", "fastify.key")),
		cert: fs.readFileSync(path.join(__dirname, "..", "https", "fastify.cert"))
	  },
	logger: true
});


fastify.register(cors, { 
	
}),

fastify.register(jwt, { secret: process.env.JWT_SECRET }),
fastify.register(ApiPoliceRouter, { prefix: "/api/policeman" }),
fastify.register(ApiCitizenRouter, { prefix: "/api/citizen" }),
fastify.register(ApiAdministratorRouter, { prefix: "/api/administrator" }),
fastify.register(AuthRouter, { prefix: "/auth" }),
fastify.register(AccountRouter, { prefix: "/acc" }),
fastify.listen({ port: 6969, host: '0.0.0.0' },  (err: any, address: any) => {
	if (err) {
	  console.error(err);
	  process.exit(1);

	}
	console.log(`Server listening at ${address}`)});

export default fastify;