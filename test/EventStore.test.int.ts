import {EventStore, SqlEventStore} from "../src/EventStore";
import {expect} from "chai";
import {PostgresTestServer} from "../database/postgres/PostgresTestServer";
import {PostgresDatabase} from "../database/postgres/PostgresDatabase";

describe('SqlEventStore', function () {
  this.timeout(30000);
  const testPostgresServer = new PostgresTestServer();

  let database: PostgresDatabase;
  let sqlEventStore: EventStore;

  before(async () => {
    database = await testPostgresServer.startAndGetFirelighterDatabase();
    sqlEventStore = new SqlEventStore(database);
  });


  after(async () => {
    await testPostgresServer.stop();
  });

  it('should store and read all events', async () => {
    const event1 = 'event1';
    const event2 = 'event2';
    await sqlEventStore.store(event1);
    await sqlEventStore.store(event2);
    expect(await sqlEventStore.readAll()).to.eql([{name: event1}, {name: event2 }])
  });
});