import {routes, Routing} from "http4js/core/Routing";
import {Method} from "http4js/core/Methods";
import {NativeHttpServer} from "http4js/servers/NativeHttpServer";
import {ResOf} from "http4js/core/Res";

export class Server {
  private server: Routing;

  constructor(private port: number = 1010) {
    this.server = routes(Method.GET, '/health', async() => {
      return ResOf(200)
    })
      .asServer(new NativeHttpServer(parseInt(process.env.PORT!) || this.port));
  }

  start() {
      try{
        this.server.start();
      } catch (e) {
        console.log("**caught error on server start logging here: ", e)
      }
      console.log(`Server running on port ${this.port}`)
  }

  stop() {
    this.server.stop();
  }
}

