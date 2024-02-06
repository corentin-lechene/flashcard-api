import {CardId} from "./card-id";
import {Card} from "./card.model";


export interface CardRepository {
    fetchAll(): Promise<Card[]>;

    fetchById(id: CardId): Promise<Card>;

    fetchByTags(tags: string[]): Promise<Card[]>;

    create(card: Card): Promise<Card>;

    update(card: Card): Promise<void>;
}