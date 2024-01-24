import {Logger} from "./logger";

export class LoggerService {
    public logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    log(message: string) {
        this.logger.log(message);
    }

    info(message: string) {
        this.logger.info(message);
    }

    error(message: string) {
        this.logger.error(message);
    }

    warning(message: string) {
        this.logger.warning(message);
    }

    success(message: string) {
        this.logger.success(message);
    }
}