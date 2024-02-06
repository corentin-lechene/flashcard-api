import * as express from "express";
import {CardController} from "../../controllers/cards/card.controller";
import {cardService} from "../../../../application.configuration";

export class CardRoute {
    static async getRoutes() {
        const router = express.Router();
        const cardController = new CardController(cardService);

        router.get("/cards", await cardController.fetchCards());
        router.post("/cards", await cardController.addCard());
        router.patch("/cards/:cardId/answer", await cardController.answerCard());
        // router.get("/cards/quizz", await cardController.getCardsByDate());

        return router;
    }
}