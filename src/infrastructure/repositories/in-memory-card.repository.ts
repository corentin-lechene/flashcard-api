import {CardRepository} from "../../domain/repositories/card-repository.interface";
import {Card} from "../../domain/models";
import {CardId} from "../../domain/models/cardId.model";
import {Category} from "../../domain/models/category.model";

export class InMemoryCardRepository implements CardRepository {
    fetchCardById(id: number): Card {
        //gérer les exceptions
        return new Card();
    }

    createCard(card: Card): Card {
        // throw new Error("not implemented");
        return new Card();
    }

    delete(cardId: CardId): void {
    }

    fetchCards(): Card[] {
        return [];
    }

    fetchCardsBySpecificDate(date: Date): Card[] {
        return [];
    }

    fetchCardsByTags(tags: String[]): Card[] {
        return [];
    }

    updateCardCategory(cardId: CardId, category: Category): void {
    }

}