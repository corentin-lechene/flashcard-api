import {beforeEach, describe, expect, it} from '@jest/globals';
import {CardService} from "../../../src/domains/cards/card.service";
import {Card} from "../../../src/domains/cards/card.model";
import {Category} from "../../../src/domains/cards/category";
import {CardException} from "../../../src/domains/cards/card.exception";
import {CardMessagesError} from "../../../src/domains/cards/card.message-error";
import {FakeMemoryCardRepository} from "../../config/fake-memory-card.repository";
import dayjs from "../../../config/dayjs.config";

describe('CardService', function () {
    let cardService: CardService;

    beforeEach(() => {
        cardService = new CardService(new FakeMemoryCardRepository());
    });

    describe('addCard', () => {
        it('should return a card created in category 1', async () => {
            const cardAdded = await cardService.create("question", "answer", "tag");

            expect(cardAdded).toBeInstanceOf(Card);
            expect(cardAdded.category).toEqual(Category.FIRST);
        });

        it('should throw an error if one field is null or undefined', async () => {
            await Promise.all([
                ["question", "answer", " "],
                ["question", " ", "tag"],
                [" ", "answer", "tag"],
                [" ", " ", ""],
            ].map(async ([question, answer, tag]) => {
                await expect(async () => await cardService.create(question, answer, tag))
                    .rejects.toThrowError(new CardException(CardMessagesError.ALL_FIELDS_MUST_BE_FILL));
            }));
        });
    });

    describe('fetch cards by tags', () => {
        it('should return cards matching two tags', async () => {
            const tags = ["tag1", "tag2"];

            // init
            const cardAdded = await cardService.create("question1", "answer1", "tag1");
            const cardAdded2 = await cardService.create("question2", "answer2", "tag2");
            const cardAdded3 = await cardService.create("question3", "answer3", "tag2");

            const cardsMatchingTags = await cardService.fetchByTags(tags);

            expect(cardsMatchingTags.length).toEqual(3);
            expect(cardsMatchingTags.some(card => card.id.value === cardAdded.id.value)).toBe(true);
            expect(cardsMatchingTags.some(card => card.id.value === cardAdded2.id.value)).toBe(true);
            expect(cardsMatchingTags.some(card => card.id.value === cardAdded3.id.value)).toBe(true);
        });

        it('should return no cards cause no matching tags', async () => {
            const tags = ["tagNotFound"];

            await cardService.create("question1", "answer1", "tag1");
            await cardService.create("question2", "answer2", "tag2");

            const cardsMatchingTags = await cardService.fetchByTags(tags);

            expect(cardsMatchingTags.length).toEqual(0);
        });
    });

    describe('nextCategory', () => {
        it('should return SECOND if current is FIRST', () => {
            const currentCategory = Category.FIRST;
            const nextCategory = cardService.nextCategory(currentCategory);

            expect(nextCategory).toBe(Category.SECOND);
        });

        it('should return THIRD if current is SECOND', () => {
            const currentCategory = Category.SECOND;
            const nextCategory = cardService.nextCategory(currentCategory);

            expect(nextCategory).toBe(Category.THIRD);
        });

        it('should return DONE if current is DONE', () => {
            const currentCategory = Category.DONE;
            const nextCategory = cardService.nextCategory(currentCategory);

            expect(nextCategory).toBe(Category.DONE);
        });
    });

    describe('answer a card', () => {
        it('should go to the next category if answer is valid', async () => {
            const cardAdded = await cardService.create("question", "answer", "tag");
            await cardService.answer(cardAdded.id, true);

            const expectedCard = await cardService.fetchById(cardAdded.id);
            expect(expectedCard.category).toBe(Category.SECOND);
        });

        it('should go to the first category if answer is invalid', async () => {
            const cardAdded = await cardService.create("question", "answer", "tag");
            await cardService.answer(cardAdded.id, false);

            const expectedCard = await cardService.fetchById(cardAdded.id);
            expect(expectedCard.category).toBe(Category.FIRST);
        });

        it('should go to the first category if category is THIRD and answer is invalid', async () => {
            const cardAdded = await cardService.create("question", "answer", "tag");
            await cardService.answer(cardAdded.id, true); // Category.SECOND
            await cardService.answer(cardAdded.id, true); // Category.THIRD
            await cardService.answer(cardAdded.id, false);

            const expectedCard = await cardService.fetchById(cardAdded.id);
            expect(expectedCard.category).toBe(Category.FIRST);
        });
    });

    describe('fetchCardsBySpecificDate', () => {
        it('should return only the cards whose review date matches the specific date', async () => {
            const card1 = await cardService.create("question", "answer", "tag");
            const card2 = await cardService.create("question", "answer", "tag");
            const card3 = await cardService.create("question", "answer", "tag");

            card2.category = Category.SECOND;

            const targetDate = dayjs().add(2, 'day').toDate();

            const cardsOnTargetDate = await cardService.fetchCardsBySpecificDate(targetDate);

            expect(cardsOnTargetDate).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    question: card2.question,
                    answer: card2.answer,
                    tag: card2.tag,
                    category: card2.category
                })
            ]));

            expect(cardsOnTargetDate).not.toEqual(expect.arrayContaining([
                expect.objectContaining({
                    question: card1.question,
                    answer: card1.answer,
                    tag: card1.tag,
                    category: card1.category
                }),
                expect.objectContaining({
                    question: card3.question,
                    answer: card3.answer,
                    tag: card3.tag,
                    category: card3.category
                })
            ]));
        });
        it('should return cards whose review date is today', async () => {
            const card1 = await cardService.create("question", "answer", "tag");

            const targetDate = dayjs().toDate();
            const cardsOnTargetDate = await cardService.fetchCardsBySpecificDate(targetDate);

            expect(cardsOnTargetDate).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    question: card1.question,
                    answer: card1.answer,
                    tag: card1.tag,
                    category: card1.category
                })
            ]));
        });
        it('should not return cards in the DONE category regardless of the date', async () => {
            const card1 = await cardService.create("question", "answer", "tag");

            card1.category = Category.DONE;

            const targetDate = dayjs().toDate();
            const cardsOnTargetDate = await cardService.fetchCardsBySpecificDate(targetDate);

            expect(cardsOnTargetDate).not.toEqual(expect.arrayContaining([
                expect.objectContaining({
                    question: card1.question,
                    answer: card1.answer,
                    tag: card1.tag,
                    category: card1.category
                })
            ]));
        });
    });
});