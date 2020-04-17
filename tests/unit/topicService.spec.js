const  TopicService = require( '../../src/services/topicService');

const TopicRepository = require( '../../src/repositories/topicRepo');


describe("Topic Service test", () => {
    it("Subscribes a CallbackUrl to Topic", async () =>{
        const topicName = 'web-dev';
        const url = 'http://localhost:8080';
        let topicRepo = new TopicRepository();
        let httpClientMock = {};
        let topicService = new TopicService({topicRepo, httpClient: httpClientMock});
        const subscription = topicService.subscribe(topicName, url);
        expect(subscription.callbackUrl).toBe(url);
        expect(subscription.topic.name).toBe(topicName)

    })

    it("Publishes Event to Subscribers", async () =>{
        const topicName = 'web-dev';
        const url = 'http://localhost:8080';
        const message = 'Hello World';
        let topicRepo = new TopicRepository();
        let postMock = jest.fn().mockReturnValue({
                topic: topicName,
                data: { message }
        })

        const httpClientMock = {
            post: postMock
        }
        let topicService = new TopicService({topicRepo, httpClient: httpClientMock});
        const event = await topicService.publish(topicName, { message });
        expect(event.data).toStrictEqual({ message })
        expect(event.topic.name).toBe(topicName)
    })
});