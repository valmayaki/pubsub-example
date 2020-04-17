
class EventCtrl {

    constructor(){}

    getEvents = (request, response) => {
        response.status(200).json({
            clientId:'',
            events:[],
        })
    }

    /**
     * Receives the Event from broker
     *
     * @param  {Express.Request} request
     * @param  {Express.Response} response
     */
    receiveEvent = (request, response) => {
        console.log(request.body)
        response.status(200).json({
            ...request.body
        })
    }
}
module.exports = EventCtrl