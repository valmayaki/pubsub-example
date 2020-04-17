import { Request, Response} from 'express';

export default class EventController {

    constructor(){}

    getEvents = (request: Request, response: Response) => {
        response.status(200).json({
            clientId:'',
            events:[],
        })
    }

    /**
     * Receives the Event from broker
     *
     * @param  {Request} request
     * @param  {Response} response
     */
    receiveEvent = (request: Request, response: Response) => {
        console.log(request.body)
        response.status(200).json({
            ...request.body
        })
    }
}