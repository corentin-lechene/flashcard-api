import {CardId} from "./cardId.model";
import {Category} from "./category.model";


export class Card {
    readonly id: CardId;
    question: string;
    answer: string
    category: Category
    tag: string;
}