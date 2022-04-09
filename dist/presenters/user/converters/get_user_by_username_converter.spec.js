"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const either_ts_1 = require("either-ts");
const failure_mapper_1 = require("../../../core/helper/failure_mapper");
const get_user_by_username_converter_1 = require("./get_user_by_username_converter");
describe("get user by username converter", () => {
    let converter;
    beforeEach(() => {
        converter = new get_user_by_username_converter_1.GetUserByUsernameConverter();
    });
    it('deve retornar um objeto com username valido', function () {
        const result = converter.handle({ username: "usernameValido" });
        expect(result.map((element) => element.username)).toStrictEqual((0, either_ts_1.right)("usernameValido"));
    });
    it("deve falhar caso algum parametro obrigatorio nao seja passado", () => {
        let result;
        result = converter.handle(new get_user_by_username_converter_1.GetUserByUsernameConverterParams({}));
        expect(result.leftMap((failure) => failure_mapper_1.FailureHelper.mapFailureToMessage(failure))).toStrictEqual((0, either_ts_1.left)(get_user_by_username_converter_1.GetUserByUsernameConverterErrorMessages.missingUsername));
    });
});
