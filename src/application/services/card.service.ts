import {Card, CardId} from "../../domain/models";

export interface CardService {
    fetchCardOfTheDay(): Promise<Card[]>;
    fetchCards(): Promise<Card[]>;
    fetchCardById(cardId: CardId): Promise<Card>;
    incrementCardCategory(cardId: CardId): Promise<void>;
    resetCardCategory(cardId: CardId): Promise<void>;
}