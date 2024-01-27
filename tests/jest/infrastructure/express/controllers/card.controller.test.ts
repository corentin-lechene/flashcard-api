// import {Card, Category} from "../../../../../src/domain/models";
// import {CardController} from "../../../../../src/infrastructure/express/controllers/card.controller";
// import {Request, RequestHandler, Response} from "express";
// import {CardUserData} from "../../../../../src/infrastructure/express/dto/card-user-data.dto";
// import {StatusMessage} from "../../../../../src/infrastructure/express/utils/status-message.util";
// import {describe, beforeEach, expect, it} from '@jest/globals';
//
// declare module 'express' {
//     export interface Request {
//         cardUserData?: CardUserData;
//     }
// }
// class MockCardService {
//     async createCard(_cardUserData: CardUserData): Promise<Card> {
//         return new Card("fakeQuestion", "fakeAnswer", Category.FIRST, "fakeTag");
//     }
// }
//
// describe('CardController',  () => {
//     let controller: CardController;
//     let req: Request;
//     let res: Response;
//
//     beforeEach(() => {
//         controller = new CardController(new MockCardService() as any);
//         req = {} as Request;
//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn().mockReturnThis(),
//             end: jest.fn().mockReturnThis(),
//             statusMessage: ""
//         } as any;
//     });
//
//     it("should add a card successfully", async () => {
//         req.cardUserData = {
//             question: "fakeQuestion",
//             answer: "fakeAnswer",
//             tag: "fakeTag",
//         } as CardUserData;
//
//         const requestHandler: RequestHandler = await controller.addCard();
//         await requestHandler(req, res, jest.fn());
//
//         expect(res.status).toHaveBeenCalledWith(201);
//         expect(res.statusMessage).toEqual(StatusMessage.CREATED_CARD);
//         expect(res.end).toHaveBeenCalled();
//
//     });
//
// });
