import {CardService} from "../../../application/usecases/card.service";

export class CardController {
    private cardService: CardService;
    constructor(cardService: CardService) {
        this.cardService = cardService;
    }

    async fetchCardOfTheDay(){
        this.cardService.fetchCardOfTheDay();
    }
}