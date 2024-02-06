import {Logger} from './logger';
import * as chalk from "chalk";

export class ConsoleLogger implements Logger {
    log(message: string) {
        console.log(message);
    }

    error(message: string) {
        console.log(chalk.red(message));
    }

    info(message: string) {
        console.log(chalk.blue(message));
    }

    success(message: string) {
        console.log(chalk.green(message));
    }

    warning(message: string) {
        console.log(chalk.rgb(255, 165, 0)(message));
    }
}


