import * as dotenv from 'dotenv'
dotenv.config();


const config ={
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 5432,
    database: {
      admin: {
        username: process.env.DB_USERNAME_ADMIN ,
        password: process.env.DB_PASSWORD_ADMIN ,
        name: process.env.DB_DATABASE_ADMIN ,
        host: process.env.DB_HOST_ADMIN ,
      },
      policeman:{
        username: process.env.DB_USERNAME_POLICEMAN,
        password: process.env.DB_PASSWORD_POLICEMAN,
        name: process.env.DB_DATABASE_POLICEMAN,
        host: process.env.DB_HOST_POLICEMAN,
      },
      citizen: {
        username: process.env.DB_USERNAME_CITIZEN,
        password: process.env.DB_PASSWORD_CITIZEN,
        name: process.env.DB_DATABASE_CITIZEN,
        host: process.env.DB_HOST_CITIZEN,
      },
      dialect: process.env.DB_DIALECT
    },
};
   
export default config;
// export const dbconnectionPoliceman: string =
//   process.env.DB_DIALECT
//   + "://"
//   + process.env.DB_USERNAME_POLICEMAN
//   + ":"
//   + process.env.DB_PASSWORD_POLICEMAN
//   + "@"
//   + process.env.DB_HOST_POLICEMAN
//   + ":"
//   + process.env.DB_HOST_PORT
//   + "/"
//   + process.env.DB_DATABASE_POLICEMAN


// export const dbconnectionCitizen: string =
//   process.env.DB_DIALECT
//   + "://"
//   + process.env.DB_USERNAME_CITIZEN
//   + ":"
//   + process.env.DB_PASSWORD_CITIZEN
//   + "@"
//   + process.env.DB_HOST_CITIZEN
//   + ":"
//   + process.env.DB_HOST_PORT
//   + "/"
//   + process.env.DB_DATABASE_CITIZEN

// const config = {
//   env: process.env.NODE_ENV || "development",
//   port: process.env.PORT || 5432,
//   database: {
//     admin: {
//       username: process.env.DB_USERNAME_ADMIN,
//       password: process.env.DB_PASSWORD_ADMIN,
//       name: process.env.DB_DATABASE_ADMIN,
//       host: process.env.DB_HOST_ADMIN,
//     },
//     policeman:{
//       username: process.env.DB_USERNAME_POLICEMAN,
//       password: process.env.DB_PASSWORD_POLICEMAN,
//       name: process.env.DB_DATABASE_POLICEMAN,
//       host: process.env.DB_HOST_POLICEMAN,
//     },
//     citizen: {
//       username: process.env.DB_USERNAME_CITIZEN,
//       password: process.env.DB_PASSWORD_CITIZEN,
//       name: process.env.DB_DATABASE_CITIZEN,
//       host: process.env.DB_HOST_CITIZEN,
//     },
//     dialect: process.env.DB_DIALECT,
//   },
// };

// export default config;