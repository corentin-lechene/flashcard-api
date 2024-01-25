import {CardService} from "../../../application/services/card.service";
import {Card} from "../../../domain/models";

export class CardController {
    private cardService: CardService;
    constructor(cardService: CardService) {
        this.cardService = cardService;
    }

    async fetchCardOfTheDay(){
        this.cardService.fetchCardOfTheDay();
    }
}