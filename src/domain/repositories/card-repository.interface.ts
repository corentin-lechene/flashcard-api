import {Card} from "../models";
import {CardId} from "../models/cardId.model";
import {Category} from "../models/category.model";

export interface CardRepository {
    fetchCardById(id: number): Card;

    fetchCards(): Card[];

    fetchCardsByTags(tags: String[]): Card[];

    createCard(card: Card): Card;

    delete(cardId: CardId): void;

    fetchCardsBySpecificDate(date: Date): Card[];

    updateCardCategory(cardId: CardId, category: Category): void;
}