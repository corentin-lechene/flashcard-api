import {CardRepository} from "../../domain/repositories/card-repository.interface";
import {Card} from "../../domain/models";
import {CardService} from "./card.service";

export class CardServiceImpl implements CardService {
    private cardRepository: CardRepository

    constructor(cardRepository: CardRepository) {
        this.cardRepository = cardRepository;
    }

    fetchCardOfTheDay(): Card[] {
        this.cardRepository.fetchCardById(1);
        return []
    }
}