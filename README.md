## Http PubSub Example
This is a Node.js project that demonstrate the Observer pattern using Http

### How to use
- Clone the project to a directory in your computer
- Navigate to the directory where you cloned the project into in your Operating System console
- Start the **broker server** by running command `yarn start` in your console. This starts the broker server with address `http://localhost:3003`
- Start a **client server** by running command `NODE_PORT=3005 yarn start` in another console of the project directory
- To subscribe `client server` to a topic run command
```bash
curl -X POST -d '{ "url": "http://localhost:3005/event"}' -H 'Content-Type: application/json'  http://localhost:3003/subscribe/topic1
```
- To publish to **broker server** run command
```bash
curl -X POST -H "Content-Type: application/json" -d '{"message": "hello"}' http://localhost:3003/publish/topic1
```
- You should see the output below in the console of the **client server** console
```javascript
{
    topic: 'topic1',
    data: { message: 'hello' }
}
```


