"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_room_converter_1 = require("./game_room_converter");
const either_ts_1 = require("either-ts");
const failure_mapper_1 = require("../../../core/helper/failure_mapper");
describe("game room converter", () => {
    let converter;
    beforeEach(() => {
        converter = new game_room_converter_1.GameRoomConverter();
    });
    it('deve retornar um GameRoom valido', function () {
        const result = converter.handle(new game_room_converter_1.GameRoomConverterParams({
            name: "Sala de testes",
            adminsIds: ["admin1"]
        }));
        expect(result.map((element) => element.name)).toStrictEqual((0, either_ts_1.right)("Sala de testes"));
    });
    it("deve falhar caso algum parametro obrigatorio nao seja passado", () => {
        let result;
        result = converter.handle(new game_room_converter_1.GameRoomConverterParams({}));
        expect(result.leftMap((failure) => failure_mapper_1.FailureHelper.mapFailureToMessage(failure))).toStrictEqual((0, either_ts_1.left)(game_room_converter_1.GameRoomConverterErrorMessages.missingName));
        result = converter.handle(new game_room_converter_1.GameRoomConverterParams({ name: "sala teste" }));
        expect(result.leftMap((failure) => failure_mapper_1.FailureHelper.mapFailureToMessage(failure))).toStrictEqual((0, either_ts_1.left)(game_room_converter_1.GameRoomConverterErrorMessages.missingAdmins));
    });
});
