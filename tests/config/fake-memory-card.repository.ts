import {Card, CardId, Category} from "../../src/domain/models";
import {CardRepository} from "../../src/domain/repositories/card-repository.interface";
import {CardMessagesError} from "../../src/exceptions/card-messages.error.enum";
import {CardException} from "../../src/exceptions/card-exception";


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
        const card = _cards.find(card => card.id === id);
        if (!card) {
            throw new CardException(CardMessagesError.CARD_NOT_FOUND);
        }
        return card;
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

    async fetchCardsByTags(tags: string[]): Promise<Card[]> {
        return _cards.filter(card => tags.map(tag => tag.toLowerCase()).includes(card.tag.toLowerCase()));
    }

    async updateCard(card: Card): Promise<void> {
        const index = _cards.findIndex(_card => _card.id === card.id);
        if (index === -1) {
            throw new CardException(CardMessagesError.CARD_NOT_FOUND);
        }
        _cards[index] = card;
        await Promise.resolve();
    }

}