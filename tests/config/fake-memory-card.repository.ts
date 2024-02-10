import {Card} from "../../src/domains/cards/card.model";
import {CardRepository} from "../../src/domains/cards/card.repository";
import {Category} from "../../src/domains/cards/category";
import {CardId} from "../../src/domains/cards/card-id";


const _cards: Card[] = []

export class FakeMemoryCardRepository implements CardRepository {
    //init
    constructor() {
        _cards.filter(card => card.id.value === "");
        const newCard = new Card("question", "answer", Category.FIRST, "tag", new Date());
        _cards.push(newCard);
    }

    async create(card: Card): Promise<Card> {
        _cards.push(card);
        return card;
    }

    async fetchById(id: CardId): Promise<Card> {
        const card = _cards.find(card => card.id.value === id.value);
        if (!card) {
            throw new Error(); //
        }
        return card;
    }

    async fetchAll(): Promise<Card[]> {
        return _cards;
    }

    async fetchByTags(tags: string[]): Promise<Card[]> {
        return _cards.filter(card => tags.includes(card.tag));
    }

    async update(card: Card): Promise<void> {
        const index = _cards.findIndex(_card => _card.id === card.id);
        if (index === -1) {
            throw new Error(); //
        }
        _cards[index] = card;
    }
}