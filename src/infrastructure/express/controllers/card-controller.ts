import {CardService} from "../../../application/services/card.service";
import {RequestHandler} from "express";

export class CardController {
    constructor(private cardService: CardService) {
        this.cardService = cardService;
    }

    async fetchCards(): Promise<RequestHandler> {
        return async (_, res) => {
            res.send(await this.cardService.fetchCards());
        }
    }

    async updateCardAnswer(): Promise<RequestHandler> {
        return async (req, res) => {
            const { isValid } = req.body;
            if(typeof isValid !== "boolean") return res.status(400).send("Bad request");

            const { cardId } = req.params;
            if(!cardId) return res.status(400).send("Bad request");

            try {
                await this.cardService.incrementCardCategory(cardId);
                res.status(200).end();
            } catch(e) {
                console.error(e);
                res.status(404).send("Card not found"); //todo create custom error
            }
        }
    }
}