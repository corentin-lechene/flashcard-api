import * as express from "express";
import * as cors from 'cors';

import {loggingMiddleware, undefinedMiddleware} from "./middlewares/logging.middleware";

import * as routes from "./routes/index";
const PORT = process.env.PORT || 3000;

export function start_express() {
    const app = express();

    app.use(cors());
    app.use(cors({ origin: ['http://localhost:5173'] }));

    // logs
    app.use(loggingMiddleware());

    // test
    app.get("/ping", (_, res) => res.send("pong"));

    // all routes


    // populate for dev

    // undefined routes
    app.use(undefinedMiddleware());

    app.listen(PORT, async () => {
        console.log(`Server started on http://localhost:${PORT}/`);
    });
}