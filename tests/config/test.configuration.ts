import {FakeMemoryCardRepository} from "./fake-memory-card.repository";
import {CardServiceImpl} from "../../src/application/services/card.service.impl";

export const fakeCardRepository = new FakeMemoryCardRepository();
export const cardService = new CardServiceImpl(fakeCardRepository);