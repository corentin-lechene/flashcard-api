import {CardRepository} from "../../domain/repositories/card-repository.interface";
import {Card, CardId, Category} from "../../domain/models";
import {CardService} from "./card.service";

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

    async updateCardCategory(cardId: CardId, category: Category): Promise<void> {
        if(!cardId) throw new Error("cardId is required"); // todo create custom error
        if(!category) throw new Error("category is required");
        await this.cardRepository.updateCardCategory(cardId, category);
    }
}