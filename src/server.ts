import {routes, Routing} from "http4js/core/Routing";
import {Method} from "http4js/core/Methods";
import {NativeHttpServer} from "http4js/servers/NativeHttpServer";
import {ResOf} from "http4js/core/Res";
import {EventHandler} from "./EventHandler";

export class Server {
  private server: Routing;

  constructor(eventHandler: EventHandler, private port: number = 1010) {
    this.server = routes(Method.GET, '/health', async() => {
      return ResOf(200)
    })
      .withPost('/event', eventHandler)
      .asServer(new NativeHttpServer(parseInt(process.env.PORT!) || this.port));
  }

  start() {
      try{
        this.server.start();
      } catch (e) {
        console.log("Error on server start:", e)
      }
      console.log(`Server running on port ${this.port}`)
  }

  stop() {
    this.server.stop();
  }
}

