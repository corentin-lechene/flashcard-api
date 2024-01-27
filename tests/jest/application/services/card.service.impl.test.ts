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

            expect(cardAdded).toBeInstanceOf(Card);
            expect(cardAdded.category).toEqual(Category.FIRST);
        });
    });

    describe('fetchCards', () => {
        it('should return cards if no tags', async () => {
            const cardUserData = new CardUserData("questionAdd", "answerAdd", "tagAdd");
            const cardAdded = await cardServiceImpl.createCard(cardUserData);

            const cardsMatchingTags = await cardServiceImpl.fetchCards();
            expect(cardsMatchingTags).toContainEqual(expect.objectContaining({
                question: cardAdded.question,
                answer: cardAdded.answer,
                tag: cardAdded.tag
            }));
        });

        it('should return cards matching one tag', async () => {
            const tags = ["tagToMatch", "newTagToMatch"];

            // init
            const cardUserData = new CardUserData("questionAdd", "answerAdd", "tagToMatch");
            const cardAdded = await cardServiceImpl.createCard(cardUserData);
            const cardUserData2 = new CardUserData("questionAdd2", "answerAdd2", "tagToMatch");
            const cardAdded2 = await cardServiceImpl.createCard(cardUserData2);
            const cardUserData3 = new CardUserData("questionAdd3", "answerAdd3", "newTagToMatch");
            const cardAdded3 = await cardServiceImpl.createCard(cardUserData3);

            const cardsMatchingTags = await cardServiceImpl.fetchCards(tags);

            expect(cardsMatchingTags).toContainEqual(expect.objectContaining({
                question: cardAdded.question,
                answer: cardAdded.answer,
                tag: cardAdded.tag
            }));
            expect(cardsMatchingTags).toContainEqual(expect.objectContaining({
                question: cardAdded2.question,
                answer: cardAdded2.answer,
                tag: cardAdded2.tag
            }));
            expect(cardsMatchingTags).toContainEqual(expect.objectContaining({
                question: cardAdded3.question,
                answer: cardAdded3.answer,
                tag: cardAdded3.tag
            }));
            expect(cardsMatchingTags.length).toEqual(3);

        });

        it('should return no cards cause no matching tags', async () => {
            const tags = ["tagNotFound"];

            // init
            const cardsMatchingTags = await cardServiceImpl.fetchCards(tags);
            expect(cardsMatchingTags.length).toEqual(0);

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