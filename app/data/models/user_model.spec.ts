import {UserModel} from "./user_model";

describe('user model', function () {
    let model: UserModel;

    beforeEach(() => {
       model = new UserModel({
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
        const result = UserModel.fromJson({
            "username": "anzell",
            "id": "validId",
            "email": "test@email.com",
            "permission": "user"
        });
        expect(result).toStrictEqual(model);
    });
});