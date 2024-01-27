import {CardService} from "../../../application/services/card.service";
import {Request, RequestHandler, Response} from "express";
import {StatusMessage} from "../utils/status-message.util";
import {CardUserData} from "../../../application/dto/card-user-data.dto";

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
                res.json(cardAdded).end();
            } catch (e) {
                res.status(400).end();
            }
        }
    }

    async updateCardAnswer(): Promise<RequestHandler> {
        return async (req, res) => {
            const {isValid} = req.body;
            if (typeof isValid !== "boolean") return res.status(400).send("Bad request");

            const {cardId} = req.params;
            if (!cardId) return res.status(400).send("Bad request");

            try {
                if (isValid) {
                    await this.cardService.incrementCardCategory(cardId);
                } else {
                    await this.cardService.resetCardCategory(cardId);
                }
                res.status(200).end();
            } catch (e) {
                console.error(e);
                res.status(404).send("Card not found"); //todo create custom error
            }
        }
    }
}