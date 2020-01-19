import {routes, Routing} from "http4js/core/Routing";
import {Method} from "http4js/core/Methods";
import {NativeHttpServer} from "http4js/servers/NativeHttpServer";
import {ResOf} from "http4js/core/Res";
import {EventHandler} from "./EventHandler";
import * as fs from "fs";
import {InternalAuthenticator} from "../utils/Authenticator";
require('dotenv').config();

export class Server {
  private server: Routing;

  constructor(eventHandler: EventHandler, private port: number = 1010) {
    const auth = new InternalAuthenticator({username: process.env.FIRELIGHTER_USERNAME as string, password: process.env.FIRELIGHTER_PASSWORD as string});
    this.server = routes(Method.GET, '/health', async() => {
      return ResOf(200)
    })
      .withPost('/event', auth.authFilter(eventHandler))
      .withGet('/docs', auth.authFilter(async (_req) => ResOf(200, (fs.readFileSync('./docs/index.html')).toString())))
      .withGet('/swagger/{filename}', async (req) => {
        const fileType = req.uri.path().split('.')[1];
        return ResOf(200, (fs.readFileSync(`./docs/${req.pathParams.filename}.${fileType}`)).toString())
      })
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

