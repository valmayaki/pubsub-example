## Http PubSub Example
This is a Node.js project that demonstrate the Observer pattern using Http

### How to use
- Clone the project to a directory in your computer
- Navigate to the directory where you clone the project into
- Start the broker server by running command `yarn start` in your terminal
- Start a client server by running command `NODE_PORT=3005 yarn start` in another terminal of the project directory
- To subscribe Client run command`curl -X POST -d '{ "url": "http://localhost:3005/event"}' -H "Content-Type: application/json"  http://localhost:3003/subscribe/topic1`
- To publish to broker server run command `curl -X POST -H "Content-Type: application/json" -d '{"message": "hello"}' http://localhost:3003/publish/topic1`
- You should see
```javascript
{
    topic: 'topic1',
    data: { message: 'hello' }
}
```
in the console of the client server terminal

