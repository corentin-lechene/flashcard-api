import {describe, expect} from '@jest/globals';
import {CardServiceImpl} from '../../../../src/application/services/card.service.impl';
import {Card, Category} from "../../../../src/domain/models";
import {InMemoryCardRepository} from "../../../../src/infrastructure/repositories/in-memory-card.repository";

describe('CardServiceImpl', () => {
    describe('incrementCardCategory', () => {
        it('should call incrementCardCategory from cardRepository', async () => {
            const card = new Card(
                "id",
                "question",
                "answer",
                Category.FIRST,
                "tag"
            );
            const cardExpected = new Card(
                "id",
                "question",
                "answer",
                Category.SECOND,
                "tag"
            );

            const cardRepository = new InMemoryCardRepository();
            const cardService = new CardServiceImpl(cardRepository);
            await cardService.incrementCardCategory(card.id);
            expect(await cardRepository.fetchCardById(card.id)).toStrictEqual(cardExpected);
        });

        it('should do nothing if card is in DONE category', async () => {
            const card = new Card(
                "id",
                "question",
                "answer",
                Category.DONE,
                "tag"
            );

            const cardRepository = new InMemoryCardRepository();
            const cardService = new CardServiceImpl(cardRepository);

            await cardRepository.updateCard(card); //update card in repository
            await cardService.incrementCardCategory(card.id);

            const cardExpected = new Card(
                "id",
                "question",
                "answer",
                Category.DONE,
                "tag"
            );
            expect(await cardRepository.fetchCardById(card.id)).toStrictEqual(cardExpected);
        });
    });
})