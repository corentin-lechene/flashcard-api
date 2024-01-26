import {CardRepository} from "../../domain/repositories/card-repository.interface";
import {Card} from "../../domain/models";
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
}