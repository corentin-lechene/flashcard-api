import {CardRepository} from "../../domain/repositories/card-repository.interface";
import {Card} from "../../domain/models";

export interface CardService {

    fetchCardOfTheDay(): Card[];
}