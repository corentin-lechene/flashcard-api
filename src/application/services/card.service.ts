import {Card, Category} from "../../domain/models";

export interface CardService {
    fetchCardOfTheDay(): Promise<Card[]>;
    fetchCards(): Promise<Card[]>;
    updateCardCategory(cardId: string, category: Category): Promise<void>;
}