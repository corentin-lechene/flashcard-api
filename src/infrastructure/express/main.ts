import * as express from "express";
import * as cors from 'cors';
import * as dotenv from "dotenv";
import {CardRoute} from "./routes";
import {loggerMiddleware} from "./middlewares/logger.middleware";
import {unknownRouteMiddleware} from "./middlewares/unknown-route.middleware";

dotenv.config();

const PORT = process.env.PORT || 8080;

export async function start_express() {
    const app = express();

    app.use(cors());
    app.use(cors({origin: [process.env.CLIENT_URL || "http://localhost:5173"]}));
    app.use(express.json());

    // logs
    app.use(loggerMiddleware());

    // test
    app.get("/ping", (_, res) => res.send("pong"));

    // all routes
    app.use(await CardRoute.getRoutes());


    // populate for dev

    // undefined routes
    app.use(unknownRouteMiddleware());

    app.listen(PORT, async () => {
        console.log(`Server started on http://localhost:${PORT}/`);
    });
}