import fastify, { FastifyServerOptions } from "fastify";
import Router from "./route";



const App = (options: FastifyServerOptions) => {
	const app = fastify(options)
	
	
	app.get("/", async () => "SERVER");
    app.register(Router, { prefix: "/api" });
	return app
}
export default App


