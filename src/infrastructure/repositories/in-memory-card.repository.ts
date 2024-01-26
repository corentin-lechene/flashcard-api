import {CardRepository} from "../../domain/repositories/card-repository.interface";
import {Card, CardId, Category} from "../../domain/models";

const _cards: Card[] = [new Card(
    "id",
    "question",
    "answer",
    Category.FIRST,
    "tag"
)]

export class InMemoryCardRepository implements CardRepository {
    async fetchCardById(id: CardId): Promise<Card> {
        if (!id) throw new Error("cardId is required"); // todo create custom error
        const card = _cards.find(card => card.id === id);
        if (!card) {
            throw new Error("card not found");
        }
        return card;
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

    async updateCard(card: Card): Promise<void> {
        const index = _cards.findIndex(_card => _card.id === card.id);
        if (index === -1) {
            throw new Error("card not found");
        }
        _cards[index] = card;
        await Promise.resolve();
    }

}