import {CardId} from "./card-id";
import {Card} from "./card.model";


export interface CardRepository {
    fetchById(id: CardId): Promise<Card>;

    fetchByTags(tags: string[]): Promise<Card[]>;

    create(card: Card): Promise<Card>;

    remove(cardId: CardId): Promise<void>;

    update(card: Card): Promise<void>;
}