import {Card, CardId} from "../../domain/models";
import {CardUserData} from "../dto/card-user-data.dto";

export interface CardService {
    fetchCardOfTheDay(): Promise<Card[]>;
    fetchCards(): Promise<Card[]>;
    fetchCardsByTags(tags: string[]): Promise<Card[]>;
    createCard(cardUserData: CardUserData): Promise<Card>;
    fetchCardById(cardId: CardId): Promise<Card>;
    incrementCardCategory(cardId: CardId): Promise<void>;
    resetCardCategory(cardId: CardId): Promise<void>;
}