import {ConnectionDetails} from "../database/postgres/PostgresMigrator";

export const EVENT_STORE_CONNECTION_DETAILS : ConnectionDetails = {
  host: `/cloudsql/firelighter:us-central1:firelighter`,
  user: 'postgres',
  password: process.env.POSTGRES_PASSWORD || '',
  database: 'firelighter'
};
