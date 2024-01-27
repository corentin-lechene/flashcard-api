import {CardServiceImpl} from "../../../../src/application/services/card.service.impl";
import {CardUserData} from "../../../../src/infrastructure/express/dto/card-user-data.dto";
import {Card, Category} from "../../../../src/domain/models";
import {describe, beforeEach, expect, it} from '@jest/globals';
import {cardService} from "../../../config/test.configuration";

describe('CardServiceImpl', () => {
    let cardServiceImpl: CardServiceImpl;

    beforeEach(() => {
        cardServiceImpl = cardService;
    });

    describe('addCard', () => {
        it('should return a card created in category 1', async () => {
            const cardUserData = new CardUserData("question", "answer", "tag");

            const cardAdded = await cardServiceImpl.createCard(cardUserData);

            // Vérifiez que cardAdded est bien du type Card
            if (cardAdded instanceof Card) {
                expect(cardAdded.category).toEqual(Category.FIRST);
            } else {
                fail("cardAdded n'est pas une instance de Card");
            }
        });
    });

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
});