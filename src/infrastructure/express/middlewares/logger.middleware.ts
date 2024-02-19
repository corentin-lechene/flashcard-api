import {Request, RequestHandler, Response} from "express";
import * as dayjs from "dayjs";
import {ConsoleLogger, LoggerService} from "../../../common";

export function loggerMiddleware(): RequestHandler {
    return (req, res, next) => {
        const logger = new LoggerService(new ConsoleLogger());

        const time = dayjs().format("YYYY-MM-DD HH:mm:ss:SSS");
        const method = req.method;
        const route = req.originalUrl;

        logger.log(`${time} - [${method}]~${route} => requested`);

        res.on('finish', () => onFinishMiddleware(req, res));

        next();
    }
}

function onFinishMiddleware(req: Request, res: Response) {
    const logger = new LoggerService(new ConsoleLogger());
    const time = dayjs().format("YYYY-MM-DD HH:mm:ss:SSS");
    const method = req.method;
    const route = req.originalUrl;

    const logMessage = `${time} - [${method}]~${route} => ${res.statusCode}`;
    if (res.locals.routeNotExists as boolean) {
        logger.error(logMessage);
    } else {
        logger.success(logMessage);
    }
}