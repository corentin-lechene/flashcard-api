import { v4 as uuidv4 } from "uuid";

export type CardId = string;

export function generateCardId(): CardId {
    return uuidv4();
}