import {Handler, Req, ResOf} from "http4js";
import {Res} from "http4js/core/Res";
import {EventStore} from "./EventStore";

export class EventHandler implements Handler {
  constructor(private eventStore: EventStore,) {
  }

  public async handle(req: Req): Promise<Res> {
    const body = JSON.parse(req.bodyString());
    const event = body.event ||'error';
    console.log('event to store', event);
    await this.eventStore.store(event);
    return ResOf(200);
  }
}