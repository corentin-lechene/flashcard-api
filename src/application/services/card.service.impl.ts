import {CardRepository} from "../../domain/repositories/card-repository.interface";
import {Card, CardId, Category} from "../../domain/models";
import {CardService} from "./card.service";
import {cardRepository} from "../../application.configuration";

export class CardServiceImpl implements CardService {
    constructor(private cardRepository: CardRepository) {
        this.cardRepository = cardRepository;
    }

    async fetchCardOfTheDay(): Promise<Card[]> {
        return []
    }

    async fetchCards(): Promise<Card[]> {
        return this.cardRepository.fetchCards();
    }

    async fetchCardById(cardId: CardId): Promise<Card> {
        if (!cardId) throw new Error("cardId is required"); // todo create custom error
        return this.cardRepository.fetchCardById(cardId);
    }

    async incrementCardCategory(cardId: CardId): Promise<void> {
        const card = await this.cardRepository.fetchCardById(cardId);
        if(card.category === Category.DONE) return Promise.resolve();

        card.category = card.category + 1;

        await this.cardRepository.updateCard(card);
        return Promise.resolve();
    }
}