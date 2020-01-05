import {Server} from "./src/server";
import {EventHandler} from "./src/EventHandler";
import {SqlEventStore} from "./src/EventStore";
import {PostgresDatabase} from "./database/postgres/PostgresDatabase";
import {Pool} from "pg";
import {EVENT_STORE_CONNECTION_DETAILS} from "./config/prod";

(async () => {
  const database = new PostgresDatabase(new Pool(EVENT_STORE_CONNECTION_DETAILS));
  const server = new Server(new EventHandler(new SqlEventStore(database)));
  server.start();
})();
