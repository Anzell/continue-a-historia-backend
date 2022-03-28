"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const player_enter_in_room_converter_1 = require("./player_enter_in_room_converter");
const either_ts_1 = require("either-ts");
const failures_1 = require("../../../core/failures/failures");
const get_player_rooms_converter_1 = require("./get_player_rooms_converter");
describe('get player rooms converter', function () {
    it('should return a valid object when data provided is valid', function () {
        const userId = "validId";
        const converter = new get_player_rooms_converter_1.GetPlayerRoomsConverter();
        const result = converter.handle(new get_player_rooms_converter_1.GetPlayerRoomsConverterParams({ userId }));
        expect(result).toStrictEqual((0, either_ts_1.right)({ userId }));
    });
    it('should return left validation failure when data provided is not valid', function () {
        const converter = new player_enter_in_room_converter_1.PlayerEnterInRoomConverter();
        expect(converter.handle(new player_enter_in_room_converter_1.PlayerEnterInRoomConverterParams({}))).toStrictEqual((0, either_ts_1.left)(new failures_1.ValidationFailure({ message: player_enter_in_room_converter_1.PlayerEnterInRoomConverterErrorMessages.missingRoomId })));
    });
});
