// injection de dependence
import {InMemoryCardRepository} from "./infrastructure/repositories/in-memory-card.repository";

export const cardRepository = new InMemoryCardRepository()
// export const cardService = new CardService(cardRepository);