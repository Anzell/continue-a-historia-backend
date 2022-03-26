"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const either_ts_1 = require("either-ts");
const failure_mapper_1 = require("../../../core/helper/failure_mapper");
const get_user_by_id_converter_1 = require("./get_user_by_id_converter");
describe("get user by id converter", () => {
    let converter;
    beforeEach(() => {
        converter = new get_user_by_id_converter_1.GetUserByIdConverter();
    });
    it('deve retornar um objeto com id válido', function () {
        const result = converter.handle({ id: "validId" });
        expect(result.map((element) => element.id)).toStrictEqual((0, either_ts_1.right)("validId"));
    });
    it("deve falhar caso algum parametro obrigatorio nao seja passado", () => {
        let result;
        result = converter.handle(new get_user_by_id_converter_1.GetUserByIdConverterParams({}));
        expect(result.leftMap((failure) => failure_mapper_1.FailureHelper.mapFailureToMessage(failure))).toStrictEqual((0, either_ts_1.left)(get_user_by_id_converter_1.GetUserByIdConverterErrorMessages.missingId));
    });
});
