// injection de dependence
import {InMemoryCardRepository} from "./infrastructure/repositories/in-memory-card.repository";
import {CardServiceImpl} from "./application/services/card.service.impl";

export const cardRepository = new InMemoryCardRepository()
export const cardService = new CardServiceImpl(cardRepository);