import {Card, CardId, Category} from "../models";

export interface CardRepository {
    fetchCardById(id: CardId): Promise<Card>;

    fetchCards(): Promise<Card[]>;

    fetchCardsByTags(tags: String[]): Promise<Card[]>;

    createCard(card: Card): Promise<Card>;

    delete(cardId: CardId): Promise<void>;

    fetchCardsBySpecificDate(date: Date): Promise<Card[]>;

    updateCard(card: Card): Promise<void>;
}