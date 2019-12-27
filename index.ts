import {Server} from "./src/server";

(async () => {
  const server = new Server();
  console.log('in start script index.ts')
  server.start();
})();
