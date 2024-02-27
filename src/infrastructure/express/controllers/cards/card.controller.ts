import {CardService} from "../../../../domains/cards/card.service";
import {RequestHandler} from "express";
import {StatusMessage} from "../../../status-message";
import {CardId} from "../../../../domains/cards/card-id";
import {CardUserData} from "../../dto/cards/card-user-data.dto";
import dayjs, {FormatDayjs} from "../../../../../config/dayjs.config"


export class CardController {
    constructor(private cardService: CardService) {
        this.cardService = cardService;
    }


    async fetchCards(): Promise<RequestHandler> {
        return async (req, res) => {
            try {
                if(req.query.tags) {
                    const tags = Array.isArray(req.query.tags) ? req.query.tags : [req.query.tags];
                    const cardsMatchingTags = await this.cardService.fetchByTags(tags as string[]);

                    res.statusMessage = StatusMessage.FOUND_CARDS_BY_TAG_QUERY;
                    res.status(200).send(cardsMatchingTags);

                } else {
                    const allCards = await this.cardService.fetchAll();
                    res.send(allCards);
                }

            } catch (e) {
                console.error(e);
                res.status(400).send();
            }


        }
    }

    async addCard(): Promise<RequestHandler> {
        return async (req, res) => {
            try {
                if(typeof req.body["question"] != "string" || typeof req.body["answer"] != "string"
                    || typeof req.body["tag"] != "string") {
                    return res.status(400).end();
                }

                const {question, answer, tag} = req.body as {question: string, answer: string, tag: string};
                if(!question?.trim() || !answer?.trim() || !tag?.trim()) {
                    return res.status(400).end();
                }

                const cardUserData = new CardUserData(question, answer, tag);
                const cardAdded = await this.cardService.create(cardUserData.question, cardUserData.answer, cardUserData.tag);

                res.status(201).statusMessage = StatusMessage.CREATED_CARD;
                res.json(cardAdded).end();
            } catch (e) {
                console.error(e);
                res.status(400).end();
            }

        }
    }

    async answerCard(): Promise<RequestHandler> {
        return async (req, res) => {
            const {isValid} = req.body;
            if (typeof isValid !== "boolean") return res.status(400);

            const {cardId} = req.params;
            if (!cardId) return res.status(400);

            try {
                await this.cardService.answer(new CardId(cardId), isValid);
                res.status(204).statusMessage = StatusMessage.ANSWER_TAKEN_ACCOUNT;
                res.send().end();
            } catch (err) {
                console.error(err);
                res.status(404).statusMessage = StatusMessage.CARD_NOT_FOUND;
                res.send().end();
            }
        }
    }

    async getCardsByDate(): Promise<RequestHandler> {
        return async (req, res) => {
            const stringDate = req.query.date as string || dayjs().format(FormatDayjs.FORMAT_DATE);

            if (!dayjs(stringDate, FormatDayjs.FORMAT_DATE, true).isValid()) {
                return res.status(400).send(`Format should be ${FormatDayjs.FORMAT_DATE}.`);
            }

            const date = dayjs(stringDate, FormatDayjs.FORMAT_DATE, true).toDate();
            try {
                const cards = await this.cardService.fetchCardsBySpecificDate(date);

                res.status(200).statusMessage = StatusMessage.CARD_FETCHED;
                res.json(cards).end();
            } catch (e) {
                console.error(e);
                res.status(404).statusMessage = StatusMessage.CARD_NOT_FOUND;
                res.send().end();
            }
        }
    }
}