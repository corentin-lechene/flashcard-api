import {CardRepository} from "../../domain/contracts/card-repository.interface";
import {Card} from "../../domain/models";

export class InMemoryCardRepository implements CardRepository {
    fetchCardById(id: number): Card {
        //gérer les exceptions
        return new Card();
    }

}