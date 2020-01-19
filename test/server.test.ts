import {Server} from "../src/server";
import {HttpClient} from "http4js/client/HttpClient";
import {ReqOf} from "http4js/core/Req";
import {Method} from "http4js/core/Methods";
import {expect} from "chai";
import {EventHandler} from "../src/EventHandler";
import {InMemoryEventStore} from "../src/EventStore";
import {Random} from "../utils/Random";

describe('Server', () => {
  const httpClient = HttpClient;
  const port = 1111;
  let server: Server;
  let eventStore: InMemoryEventStore;
  const encodedCredentials = Buffer.from(`${process.env.FIRELIGHTER_USERNAME}:${process.env.FIRELIGHTER_PASSWORD}`).toString('base64');
  const authHeaders = {'authorization': `Basic ${encodedCredentials}`};

  beforeEach(async () => {
    eventStore = new InMemoryEventStore();
    server = new Server(new EventHandler(eventStore), port);
    server.start();
  });

  afterEach(async () => {
    server.stop();
  });

  it('should respond 200 on health', async () => {
    const response = await httpClient(ReqOf(Method.GET,`http://localhost:${port}/health`));
    expect(response.status).to.eql(200);
  });

  it('should respond if events are stored', async() => {
    const event = Random.string();
    const response = await httpClient(ReqOf(Method.POST,`http://localhost:${port}/event`, JSON.stringify({event}), authHeaders));
    expect(response.status).to.eql(200);
    expect(eventStore.events).to.eql([event]);
  });

  it('should fail if auth not provided for events endpoint', async() => {
    const event = Random.string();
    const response = await httpClient(ReqOf(Method.POST,`http://localhost:${port}/event`, JSON.stringify({event})));
    expect(response.status).to.eql(401);
    expect(response.bodyString()).to.eql('User not authenticated');
  });
});
