import { DateHelper } from "../../core/helper/date_helper";
import { PhraseModel } from "./phrase_model";

describe("phrase model", () => {
    let model: PhraseModel;

    beforeEach(()=> {
        model = new PhraseModel({
            phrase:"Era uma vez",
            senderId: "userId",
            sendAt: new Date(2021,10,10)
        });
    });

    it("to json", () => {
        const expected = {
            "phrase": "Era uma vez",
            "sendAt": DateHelper.dateToNumber(new Date(2021,10,10)),
            "senderId": "userId"
        };
        const result = model.toJson();
        expect(result).toStrictEqual(expected); 
    });

    it("from json", () => {
        const result = PhraseModel.fromJson({
            "phrase": "Era uma vez",
            "sendAt": DateHelper.dateToNumber(new Date(2021,10,10)),
            "senderId": "userId"
        });
        expect(result).toStrictEqual(model);
    });
});