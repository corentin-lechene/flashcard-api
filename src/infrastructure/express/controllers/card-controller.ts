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
}