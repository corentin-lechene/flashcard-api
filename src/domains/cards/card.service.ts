import {Card} from "./card.model";
import {Category} from "./category";
import {CardException} from "./card.exception";
import {CardMessagesError} from "./card.message-error";
import {CardId} from "./card-id";
import {CardRepository} from "./card.repository";


export class CardService {
    constructor(private cardRepository: CardRepository) {
        this.cardRepository = cardRepository;
    }
    
    async fetchAll(): Promise<Card[]> {
        return this.cardRepository.fetchAll();
    }

    async fetchByTags(tags: string[]): Promise<Card[]> {
        return this.cardRepository.fetchByTags(tags);
    }

    async fetchById(cardId: CardId) {
        return this.cardRepository.fetchById(cardId);
    }

    async answer(cardId: CardId, isValid: boolean) {
        const card = await this.fetchById(cardId);
        if(isValid) {
            card.category = this.nextCategory(card.category);
        } else {
            card.category = Category.FIRST;
        }

        return this.cardRepository.update(card);
    }


    async create(question: string, answer: string, tag: string): Promise<Card> {
        if (!question?.trim() || !answer?.trim() || !tag?.trim()) {
            throw new CardException(CardMessagesError.ALL_FIELDS_MUST_BE_FILL);
        }

        const newCard = new Card(question, answer, Category.FIRST, tag);
        return this.cardRepository.create(newCard);
    }


    nextCategory(currentCategory: Category): Category { //fixme à déplacer ??
        const categories = Object.values(Category);
        const currentIndex = categories.indexOf(currentCategory);
        if (currentIndex === categories.length - 1) return Category.DONE;
        return categories[currentIndex + 1];
    }


}