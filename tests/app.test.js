const App = require('../src/app');
const configureContainer = require('../src/container');
const nock = require('nock');
const { asFunction } = require('awilix');
const request = require('supertest');
describe("App test", () => {
    let app, container, server;
    beforeEach(() => {
        container = configureContainer()
        app = new App(container);
        server = app.handle;
    })
    afterAll(async () => {
          // Close the http server when all tests are done
        server.close()

        // Dispose the container as well (returns a promise)
        return container.dispose()
      })
    it("App should be valid", async () => {
        const response = await request(server).get('/');
        expect(response.statusCode).toBe(200);
    })
    it("Subscribes client to a topic", async () => {
        const topic = "web-dev";
        const response = await request(server)
            .post(`/subscribe/${topic}`)
            .send({
                url: "http://localhost:8000/event"
            });
        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty("subscriptionId");
        expect(response.body).toHaveProperty("topic")
        expect(response.body.topic).toBe(topic)
    })
    it("Publishes event to clients", async () => {
        const topic = "web-dev";
        const message = "Hello Word";
        function axiosMock(){
            return {
                post: (url, data, options) => Promise.resolve({
                    topic: topic,
                    data: { message }
                })
            }
        }
        const httpClientMock = jest.fn(() => ({
            post: (url, data, options) => Promise.resolve({
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
            .send({
                message
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('eventId')
        expect(response.body.topic).toEqual(topic)
        expect(httpClientMock).toHaveBeenCalled();
        // expect(scope.isDone()).toBeTruthy()
    })
})