import {Card} from "./card.model";
import {Category, REVIEW_FREQUENCIES} from "./category";
import {CardException} from "./card.exception";
import {CardMessagesError} from "./card.message-error";
import {CardId} from "./card-id";
import {CardRepository} from "./card.repository";
import dayjs from "../../../config/dayjs.config";


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

        const newCard = new Card(question.trim(), answer.trim(), Category.FIRST, tag.trim());
        return this.cardRepository.create(newCard);
    }

    async fetchCardsBySpecificDate(targetDate: Date): Promise<Card[]> {
        const cards = await this.fetchAll();

        return cards.filter(card => {
            if (card.category === Category.DONE) {
                return false;
            }
            const daysToReview = this.getDaysToReview(card.category);
            const reviewDate = dayjs().startOf('day').add(daysToReview, 'day');
            return reviewDate.isSame(dayjs(targetDate).startOf('day'), 'day');
        });
    }

    getDaysToReview(category: Category): number {
        if (category === Category.FIRST) {
            return 0;
        } else {
            return REVIEW_FREQUENCIES[category] ?? 0;
        }
    }

    nextCategory(currentCategory: Category): Category { //fixme à déplacer ??
        const categories = Object.values(Category);
        const currentIndex = categories.indexOf(currentCategory);
        if (currentIndex === categories.length - 1) return Category.DONE;
        return categories[currentIndex + 1];
    }


}