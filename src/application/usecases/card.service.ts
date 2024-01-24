import {CardRepository} from "../../domain/contracts/card-repository.interface";
import {Card} from "../../domain/models";

export interface CardService {

    fetchCardOfTheDay(): Card[];
}