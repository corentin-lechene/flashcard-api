import {beforeEach, describe, expect, it} from '@jest/globals';

import {CardServiceImpl} from "../../../../src/application/services/card.service.impl";
import {CardUserData} from "../../../../src/application/dto/card-user-data.dto";
import {Card, Category} from "../../../../src/domain/models";
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
            expect(cardAdded).toBeInstanceOf(Card);
            expect(cardAdded.category).toEqual(Category.FIRST);
        });
    });

    describe('incrementCardCategory', () => {
        it('should call incrementCardCategory from cardRepository', async () => {
            const cardUserData = new CardUserData("question", "answer", "tag");
            const card = await cardServiceImpl.createCard(cardUserData);

            const cardExpected = new Card(
                "question",
                "answer",
                Category.SECOND,
                "tag"
            );

            await cardServiceImpl.incrementCardCategory(card.id);
            expect(card.category).toEqual(cardExpected.category);
        });

        it('should do nothing if card is in DONE category', async () => {
            const cardUserData = new CardUserData("question", "answer", "tag");
            const card = await cardServiceImpl.createCard(cardUserData);

            for (let i = 1; i <= Category.DONE; i++) {
                await cardService.incrementCardCategory(card.id);
            }

            const cardExpected = new Card(
                "question",
                "answer",
                Category.DONE,
                "tag"
            );
            expect(card.category).toEqual(cardExpected.category);
        });
    });
});