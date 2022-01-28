import {UserModel} from "./user_model";
import {DateHelper} from "../../core/helper/date_helper";
import {PhraseModel} from "./phrase_model";

describe('user model', function () {
    let model: UserModel;

    beforeEach(() => {
       model = new UserModel({
           username: "anzell",
           id: "validId",
           email: "test@email.com"
       });
    });

    it("to json", () => {
        const expected = {
            "username": "anzell",
            "id": "validId",
            "email": "test@email.com"
        };
        const result = model.toJson();
        expect(result).toStrictEqual(expected);
    });

    it("from json", () => {
        const result = UserModel.fromJson({
            "username": "anzell",
            "id": "validId",
            "email": "test@email.com"
        });
        expect(result).toStrictEqual(model);
    });
});