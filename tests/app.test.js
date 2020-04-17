const app = require('../src/app');
const nock = require('nock');
const request = require('supertest');
describe("App test", () => {
    it("App should be valid", async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    })
    it("Subscribes client to a topic", async () => {
        const topic = "web-dev";
        const response = await request(app)
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
        // app.container.register({})
        const scope = nock('http://localhost:8000')
            .post('/event')
            .reply(200, {
                topic: topic,
                data: message
            })
        const response = await request(app)
            .post(`/publish/${topic}`)
            .send({
                message
            });
        console.log(response.error)
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('eventId')
        expect(response.body.topic).toEqual(topic)
    })
})