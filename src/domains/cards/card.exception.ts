import {CardMessagesError} from "./card.message-error";

export class CardException extends Error {
    constructor(message: CardMessagesError) {
        super(message.toString());
    }
}