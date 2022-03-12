"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const player_enter_in_room_converter_1 = require("./player_enter_in_room_converter");
const either_ts_1 = require("either-ts");
const failures_1 = require("../../../core/failures/failures");
describe('player enter in room converter', function () {
    it('should return a valid object when data provided is valid', function () {
        const userId = "validId";
        const roomId = "validId";
        const converter = new player_enter_in_room_converter_1.PlayerEnterInRoomConverter();
        const result = converter.handle(new player_enter_in_room_converter_1.PlayerEnterInRoomConverterParams({ userId, roomId }));
        expect(result).toStrictEqual(either_ts_1.right({ userId, roomId }));
    });
    it('should return left validation failure when data provided is not valid', function () {
        const converter = new player_enter_in_room_converter_1.PlayerEnterInRoomConverter();
        expect(converter.handle(new player_enter_in_room_converter_1.PlayerEnterInRoomConverterParams({ userId: "validId" }))).toStrictEqual(either_ts_1.left(new failures_1.ValidationFailure({ message: player_enter_in_room_converter_1.PlayerEnterInRoomConverterErrorMessages.missingRoomId })));
        expect(converter.handle(new player_enter_in_room_converter_1.PlayerEnterInRoomConverterParams({ roomId: "validId" }))).toStrictEqual(either_ts_1.left(new failures_1.ValidationFailure({ message: player_enter_in_room_converter_1.PlayerEnterInRoomConverterErrorMessages.missingUserId })));
    });
});
