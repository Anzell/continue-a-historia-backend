"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("./user_model");
describe('user model', function () {
    let model;
    beforeEach(() => {
        model = new user_model_1.UserModel({
            username: "anzell",
            id: "validId",
            email: "test@email.com",
            permission: "user"
        });
    });
    it("to json", () => {
        const expected = {
            "username": "anzell",
            "id": "validId",
            "email": "test@email.com",
            "permission": "user"
        };
        const result = model.toJson();
        expect(result).toStrictEqual(expected);
    });
    it("from json", () => {
        const result = user_model_1.UserModel.fromJson({
            "username": "anzell",
            "id": "validId",
            "email": "test@email.com",
            "permission": "user"
        });
        expect(result).toStrictEqual(model);
    });
});
