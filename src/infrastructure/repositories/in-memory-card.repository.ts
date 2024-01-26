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
        if (!cardId) throw new Error("cardId is required"); // todo create custom error
        if (!category) throw new Error("category is required");

        const card = _cards.find(card => card.id === cardId);
        if (!card) {
            throw new Error("card not found");
        }
        card.category = category;
        await Promise.resolve();
    }

}