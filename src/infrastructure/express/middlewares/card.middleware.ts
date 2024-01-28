import {Request, RequestHandler, Response} from "express";
import {CardUserData} from "../../../application/dto/card-user-data.dto";

declare module 'express' {
    export interface Request {
        cardUserData?: CardUserData;
    }
}

export function checkCardBody(): RequestHandler {
    return async (req: Request, res: Response, next) => {

        try {
            if(typeof req.body["question"] != "string" || typeof req.body["answer"] != "string"
                || typeof req.body["tag"] != "string") {
                return res.status(400).end();
            }

            if(!req.body['question']?.trim() || !req.body["answer"]?.trim() || !req.body["tag"]?.trim()) {
                return res.status(400).end();
            }

        } catch (e) {
            return res.status(400).end();
        }

        const question = req.body["question"];
        const answer = req.body["answer"];
        const tag = req.body["tag"];

        req.cardUserData = new CardUserData(question, answer, tag);
        next();
    }

}
