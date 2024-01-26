import {CardRepository} from "../../domain/repositories/card-repository.interface";
import {Card, Category} from "../../domain/models";
import {CardService} from "./card.service";
import {CardUserData} from "../../infrastructure/express/dto/card-user-data.dto";


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

    async createCard(cardUserData: CardUserData): Promise<Card> {
        const card = new Card(cardUserData.question, cardUserData.answer, Category.FIRST, cardUserData.tag);
        return this.cardRepository.createCard(card);
    }


}