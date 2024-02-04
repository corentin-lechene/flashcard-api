import {CardMessagesError} from "./card-messages.error.enum";

export class CardException extends Error {
    constructor(message: CardMessagesError) {
        super(message.toString());
    }
}