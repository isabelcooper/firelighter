import {Pool} from "pg";

export class PostgresDatabase {
  constructor(private pool: Pool) {}

  async query(sqlStatement: string) {
    const client = await this.pool.connect();
    console.log('connected')
    const result = await client.query(sqlStatement);
    await client.release();
    return result
  }
}