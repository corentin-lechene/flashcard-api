import {CardService} from "../../../application/services/card.service";
import {Request, RequestHandler, Response} from "express";
import {StatusMessage} from "../utils/status-message.util";
import {CardUserData} from "../../../application/dto/card-user-data.dto";
import dayjs, {FormatDayjs} from "../../../../config/dayjs.config";

export class CardController {
    constructor(private cardService: CardService) {
        this.cardService = cardService;
    }

    async fetchCards(): Promise<RequestHandler> {
        return async (req: Request, res: Response) => {
            try {
                if(req.query.tags) {
                    const tags = Array.isArray(req.query.tags) ? req.query.tags : [req.query.tags];
                    const cardsMatchingTags = await this.cardService.fetchCardsByTags(tags as string[]);

                    res.statusMessage = StatusMessage.FOUND_CARDS_BY_TAG_QUERY;
                    res.status(200).send(cardsMatchingTags);

                } else {
                    const allCards = await this.cardService.fetchCards();
                    res.send(allCards);
                }

            } catch (e) {
                console.error(e);
                res.status(400).send();
            }

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
                console.error(e);
                res.status(400).end();
            }
        }
    }

    async updateCardCategory(): Promise<RequestHandler> {
        return async (req, res) => {
            const {isValid} = req.body;
            if (typeof isValid !== "boolean") return res.status(400);

            const {cardId} = req.params;
            if (!cardId) return res.status(400);

            try {
                if (isValid) {
                    await this.cardService.incrementCardCategory(cardId);
                } else {
                    await this.cardService.resetCardCategory(cardId);
                }
                res.status(204).statusMessage = StatusMessage.ANSWER_TAKEN_ACCOUNT;
                res.send().end();
            } catch (e) {
                console.error(e);
                res.status(404).statusMessage = StatusMessage.CARD_NOT_FOUND;
                res.send().end();
            }
        }
    }

    async getCardsByDate(): Promise<RequestHandler> {
        return async (req: Request, res: Response) => {
            const stringDate = req.query.date as string || dayjs().format(FormatDayjs.FORMAT_DATE);
            if (!stringDate) return res.status(400).send("Bad request");
            if (!dayjs(stringDate, FormatDayjs.FORMAT_DATE, true).isValid()) {
                return res.status(400).send("Format should be ${FormatDayjs.FORMAT_DATE}.");
            }

            const date = dayjs(stringDate, FormatDayjs.FORMAT_DATE, true).toDate();
            try {
                const cards = await this.cardService.fetchCardsBySpecificDate(date);
                res.status(200).statusMessage = StatusMessage.CARD_FETCHED;
                res.json(cards).end();
            } catch (e) {
                console.error(e);
                res.status(400).end();
            }
        }
    }
}