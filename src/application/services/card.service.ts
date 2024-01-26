import {Card} from "../../domain/models";
import {CardUserData} from "../../infrastructure/express/dto/card-user-data.dto";

export interface CardService {
    fetchCardOfTheDay(): Promise<Card[]>;
    fetchCards(): Promise<Card[]>;
    createCard(cardUserData: CardUserData): Promise<Card>;
}