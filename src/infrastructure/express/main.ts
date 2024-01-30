import * as express from "express";
import * as cors from 'cors';

import {loggingMiddleware, undefinedMiddleware} from "./middlewares/logging.middleware";

import {cardService} from "../../application.configuration"; //fixme
import {checkCardBody} from "./middlewares/card.middleware"; // fixme
import {CardController} from "./controllers/card.controller"; //fixme

const PORT = process.env.PORT || 8080;

export async function start_express() {
    const app = express();

    app.use(cors());
    app.use(cors({ origin: ['http://localhost:5173'] }));
    app.use(express.json());

    // logs
    app.use(loggingMiddleware());

    // test
    app.get("/ping", (_, res) => res.send("pong"));

    // all routes
    const cardController = new CardController(cardService);
    app.get("/cards", await cardController.fetchCards());
    app.post("/cards", checkCardBody(), await cardController.addCard());
    app.patch("/cards/:cardId/answer", await cardController.updateCardCategory());

    // populate for dev

    // undefined routes
    app.use(undefinedMiddleware());

    app.listen(PORT, async () => {
        console.log(`Server started on http://localhost:${PORT}/`);
    });
}