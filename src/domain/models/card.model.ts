import {CardId, Category} from "./index";


export class Card {
    readonly id: CardId;
    question: string;
    answer: string
    category: Category
    tag: string;

    constructor(id: CardId, question: string, answer: string, category: Category, tag: string) {
        this.id = id;
        this.question = question;
        this.answer = answer;
        this.category = category;
        this.tag = tag;
    }
}