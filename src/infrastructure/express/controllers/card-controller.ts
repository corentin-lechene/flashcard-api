import {CardService} from "../../../application/services/card.service";
import {Request, RequestHandler, Response} from "express";
import {CardUserData} from "../dto/card-user-data.dto";
import {StatusMessage} from "../utils/status-message.util";

export class CardController {
    constructor(private cardService: CardService) {
        this.cardService = cardService;
    }

    async fetchCards(): Promise<RequestHandler> {
        return async (_, res) => {
            res.send(await this.cardService.fetchCards());
        }
    }

    async addCard(): Promise<RequestHandler> {
        return async (req: Request, res: Response) => {
            try {
                const cardUserData = req.cardUserData as CardUserData;
                const cardAdded = await this.cardService.createCard(cardUserData);

                res.status(201).statusMessage = StatusMessage.CREATED_CARD;
                res.status(201).json(cardAdded).end();
            } catch (e) {
                res.status(400).end();
            }
        }
    }
}