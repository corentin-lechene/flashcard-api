import {CardRepository} from "../../domain/repositories/card-repository.interface";
import {Card, CardId, Category} from "../../domain/models";
import {CardService} from "./card.service";
import {CardUserData} from "../dto/card-user-data.dto";
import {CardException} from "../../exceptions/card-exception";
import {CardMessagesError} from "../../exceptions/card-messages.error.enum";


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

    async fetchCardsByTags(tags: string[]): Promise<Card[]> {
        return this.cardRepository.fetchCardsByTags(tags);
    }

    async createCard(cardUserData: CardUserData): Promise<Card> {
        if (!cardUserData.question.trim() || !cardUserData.answer.trim() || !cardUserData.tag.trim()) {
            throw new CardException(CardMessagesError.ALL_FIELDS_MUST_BE_FILL);
        }

        const card = new Card(cardUserData.question, cardUserData.answer, Category.FIRST, cardUserData.tag);
        return this.cardRepository.createCard(card);
    }



    async fetchCardById(cardId: CardId): Promise<Card> {
        if (!cardId) throw new CardException(CardMessagesError.CARD_ID_IS_REQUIRED);
        return this.cardRepository.fetchCardById(cardId);
    }

    async incrementCardCategory(cardId: CardId): Promise<void> {
        const card = await this.cardRepository.fetchCardById(cardId);
        if(card.category === Category.DONE) return Promise.resolve();

        card.category = card.category + 1;

        await this.cardRepository.updateCard(card);
        return Promise.resolve();
    }

    async resetCardCategory(cardId: CardId): Promise<void> {
        const card = await this.cardRepository.fetchCardById(cardId);
        card.category = Category.FIRST;

        await this.cardRepository.updateCard(card);
        return Promise.resolve();
    }
}