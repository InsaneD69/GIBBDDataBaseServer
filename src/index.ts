// import App from "./app";


// const app = App({
// 	logger: true
// })
// const PORT = 8080
// app.listen({port:Number(PORT),host: '0.0.0.0' }, (err: any) => {
// 	if (err) {
// 		app.log.error(err);
// 		process.exit(1)
// 	}
// 	app.log.info(`SERVE ON ${PORT}`)
//})





// import dbconnectorAdmin from "./db/connect"

// const fastify = require('fastify')()

// //const server = fastify()
// //import { getInfoAboutCountry } from './dbApi/SelectData'
// import clientAd= require("./db/connect")
// fastify.register(require('@fastify/postgres'), {
//   connectionString: 'TrafficPolice://admin@localhost/root'
// })


// fastify.get('/qwerty/:id', (req: any, reply: { send: (arg0: any) => void }) => {
  
//   fastify.pg.connect(onConnect)

//   function onConnect (err: any, release: () => void) {
//     if (err) {
//       console.log(err);
//       return 
//       reply.send(err);}
    

//     fastify.query('SELECT * FROM public.TrafficPolice.article',
//       function onResult (err: any, result: any) {
//         release()
//         console.log(err)
//         console.log(result)
//         reply.send(err || result)
//       }
//     )
//   }
// })


// fastify.listen({ port: 8080 }, (err: any, address: any) => {

  
//   if (err) {
//     console.error(err)
//     process.exit(1)
//   }
//   console.log(`Server listening at ${address}`)
// })
