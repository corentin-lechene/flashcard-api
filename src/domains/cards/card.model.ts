import {CardId} from "./card-id";
import {Category} from "./category";


export class Card {

    readonly id: CardId;
    category: Category
    question: string;
    answer: string
    tag: string;
    lastAnsweredDate : Date;

    constructor(question: string, answer: string, category: Category, tag: string, lastAnsweredDate: Date) {
        this.id = new CardId();
        this.category = category;
        this.question = question;
        this.answer = answer;
        this.tag = tag;
        this.lastAnsweredDate = lastAnsweredDate
    }
}