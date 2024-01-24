import {Card} from "../models";

export interface CardRepository {
    fetchCardById(id: number): Card;
}