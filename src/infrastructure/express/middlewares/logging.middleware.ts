import {RequestHandler, Request, Response} from "express";
import * as dayjs from "dayjs";
import {LoggerService, ConsoleLogger} from "../../../common";

export function loggingMiddleware(): RequestHandler {
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

export function onFinishMiddleware(req: Request, res: Response) {
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

export function undefinedMiddleware(): RequestHandler {
    return (_, res) => {
        res.locals.routeNotExists = true;
        res.status(404).end();
    }
}