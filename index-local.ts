import {Server} from "./src/server";
import {EventHandler} from "./src/EventHandler";
import {InMemoryEventStore} from "./src/EventStore";

(async () => {
  const server = new Server(new EventHandler(new InMemoryEventStore()));
  server.start();
})();
