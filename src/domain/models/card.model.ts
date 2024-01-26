import {CardId, Category, generateCardId} from "./index";

export class Card {
    readonly id: CardId;
    category: Category
    question: string;
    answer: string
    tag: string;

    constructor(question: string, answer: string, category: Category, tag: string) {
        this.id = generateCardId();
        this.category = category;
        this.question = question;
        this.answer = answer;
        this.tag = tag;
    }
}