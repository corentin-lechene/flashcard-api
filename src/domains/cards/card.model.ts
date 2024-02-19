import {CardId} from "./card-id";
import {Category} from "./category";


export class Card {

    readonly id: CardId;
    category: Category
    question: string;
    answer: string
    tag: string;

    constructor(question: string, answer: string, category: Category, tag: string) {
        this.id = new CardId();
        this.category = category;
        this.question = question;
        this.answer = answer;
        this.tag = tag;
    }
}