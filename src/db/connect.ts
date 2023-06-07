import config from "./config";


export const dbconnectionAdmin: string =
    config.database.dialect 
  + "://"
  + config.database.admin.username
  + ":"
  + config.database.admin.password
  + "@"
  + config.database.admin.host
  + ":"
  + config.port
  + "/"
  + config.database.admin.name

  export const dbconnectionPoliceman: string =
    config.database.dialect 
  + "://"
  + config.database.policeman.username
  + ":"
  + config.database.policeman.password
  + "@"
  + config.database.policeman.host
  + ":"
  + config.port
  + "/"
  + config.database.policeman.name

  export const dbconnectionCitizen: string =
    config.database.dialect 
  + "://"
  + config.database.citizen.username
  + ":"
  + config.database.citizen.password
  + "@"
  + config.database.citizen.host
  + ":"
  + config.port
  + "/"
  + config.database.citizen.name



  export function dbconnectionPolicemanClient(username:string, password:string): string {

    return config.database.dialect+ "://"+ username+ ":"+ password+ "@"+ 
    config.database.policeman.host+ ":"+ config.port+ "/"+ 
    config.database.policeman.name;
  }

export function dbconnectionCitizenClient(username:string, password:string): string {

  return config.database.dialect
    + "://"
    + username
    + ":"
    + password
    + "@"
    + config.database.citizen.host
    + ":"
    + config.port
    + "/"
    + config.database.citizen.name;
}
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













