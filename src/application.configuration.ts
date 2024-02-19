import {InMemoryCardRepository} from "./infrastructure/repositories/in-memory/in-memory-card.repository";
import {CardService} from "./domains/cards/card.service";

export const cardRepository = new InMemoryCardRepository();
export const cardService = new CardService(cardRepository);