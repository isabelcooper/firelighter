import {ConnectionDetails} from "../database/postgres/PostgresMigrator";

export const getFirelighterConnectionDetails = (port: number): ConnectionDetails => {
  return {
    host: 'localhost',
    port: port,
    user: 'postgres',
    password: '',
    database: 'firelighter'
  }
};