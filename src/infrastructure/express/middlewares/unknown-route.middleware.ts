import {RequestHandler} from "express";

export function unknownRouteMiddleware(): RequestHandler {
    return (_, res) => {
        res.locals.routeNotExists = true;
        res.status(404).end();
    }
}