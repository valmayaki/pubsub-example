import App from '../src/app';
import  configureContainer from '../src/container';
import  nock from 'nock';
import  { asFunction, AwilixContainer } from 'awilix';
import request = require('supertest');
import { RequestListener } from 'http';

describe("App test in typescript", () => {
    let app, container: AwilixContainer, server: RequestListener;

    beforeEach(() => {
        container = configureContainer()
        app = new App(container);
        server = app.handle;
    })

    afterAll(async () => {

        return container.dispose()
    })

    it("App should be valid", async () => {
        const response = await request(server).get('/');
        expect(response.status).toBe(200);
    })

    it("Subscribes client to a topic", async () => {
        const topic = "web-dev";
        const response = await request(server)
            .post(`/subscribe/${topic}`)
            .send({
                url: "http://localhost:8000/event"
            })
            .expect(201);
        expect(response.body).toHaveProperty("subscriptionId");
        expect(response.body).toHaveProperty("topic")
        expect(response.body.topic).toBe(topic)
    })

    it("Publishes event to clients", async () => {
        const topic = "web-dev";
        const message = "Hello Word";
        const httpClientMock = jest.fn(() => ({
            post: (url: string, data: string, options: any) => Promise.resolve({
                topic: topic,
                data: { message }
            })
        }))
        container = configureContainer()
        container.register({
            httpClient: asFunction(httpClientMock).singleton()
        });
        app = new App(container);
        server = app.handle;
        // const scope = nock('http://localhost:8000')
        //     .post('/event')
        //     .reply(200, {
        //         topic: topic,
        //         data: message
        //     })
        const response = await request(server)
            .post(`/publish/${topic}`)
            .set('Accept', 'applicaiton/json')
            .send({
                message
            })
            .expect(200);
        expect(response.body).toHaveProperty('eventId')
        expect(response.body.topic).toEqual(topic)
        expect(httpClientMock).toHaveBeenCalled();
    })
})