import {CardRepository} from "../../domain/repositories/card-repository.interface";
import {Card, CardId, Category} from "../../domain/models";

const _cards: Card[] = []

export class InMemoryCardRepository implements CardRepository {
    async fetchCardById(id: CardId): Promise<Card> {
        //todo
        throw new Error("not implemented");
    }

    async createCard(card: Card): Promise<Card> {
        //todo
        throw new Error("not implemented");
    }

    async delete(cardId: CardId): Promise<void> {
        //todo
        throw new Error("not implemented");
    }

    async fetchCards(): Promise<Card[]> {
        const newCard = new Card(
            "id",
            "question",
            "answer",
            Category.FIRST,
            "tag"
        )
        _cards.push(newCard);
        return _cards;
    }

    async fetchCardsBySpecificDate(date: Date): Promise<Card[]> {
        return [];
    }

    async fetchCardsByTags(tags: String[]): Promise<Card[]> {
        return [];
    }

    async updateCardCategory(cardId: CardId, category: Category): Promise<void> {
        //todo
        throw new Error("not implemented");
    }

}