import {Card, CardId} from "../models";

export interface CardRepository {
    fetchCardById(id: CardId): Promise<Card>;

    fetchCards(): Promise<Card[]>;

    fetchCardsByTags(tags: string[]): Promise<Card[]>;

    createCard(card: Card): Promise<Card>;

    delete(cardId: CardId): Promise<void>;

    updateCard(card: Card): Promise<void>;
}