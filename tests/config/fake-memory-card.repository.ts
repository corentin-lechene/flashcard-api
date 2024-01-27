import {Card, CardId, Category} from "../../src/domain/models";
import {CardRepository} from "../../src/domain/repositories/card-repository.interface";


const _cards: Card[] = []

export class FakeMemoryCardRepository implements CardRepository {
    //init
    constructor() {
        const newCard = new Card(
            "question",
            "answer",
            Category.FIRST,
            "tag"
        )
        _cards.push(newCard);
    }
    async fetchCardById(id: CardId): Promise<Card> {
        //todo

        throw new Error("not implemented");
    }

    async createCard(card: Card): Promise<Card> {
        _cards.push(card);
        return card;
    }

    async delete(cardId: CardId): Promise<void> {
        //todo
        throw new Error("not implemented");
    }

    async fetchCards(): Promise<Card[]> {
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