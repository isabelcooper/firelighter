import {PostgresDatabase} from "../database/postgres/PostgresDatabase";

export interface EventStore {
  store(event: string): Promise<any>;
  readAll(): Promise<any[]>;
}

export class InMemoryEventStore implements EventStore {
  public events: string[] = [];
  async readAll(): Promise<any[]> {
    return this.events;
  }

  async store(event: string): Promise<any> {
    this.events.push(event);
    return undefined;
  }
}

export class SqlEventStore implements EventStore {
  constructor(private database: PostgresDatabase) {
  }

  async store(event: string): Promise<any> {
    let sqlStatement = `INSERT INTO events (name) VALUES ('${event}') ON CONFLICT DO NOTHING RETURNING *;`;
    const rows = (await this.database.query(sqlStatement)).rows;
    return {inserted: !!rows.length}
  }

  async readAll(): Promise<any[]> {
    const sqlStatement = 'SELECT * from events;';
    return (await this.database.query(sqlStatement)).rows;
  }
}