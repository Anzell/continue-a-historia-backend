"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const either_ts_1 = require("either-ts");
const failures_1 = require("../../../core/failures/failures");
const get_room_by_id_converter_1 = require("./get_room_by_id_converter");
describe('get room by id converter', function () {
    it('should return a valid object when data provided is valid', function () {
        const roomId = "validId";
        const converter = new get_room_by_id_converter_1.GetRoomByIdConverter();
        const result = converter.handle(new get_room_by_id_converter_1.GetRoomByIdConverterParams({ roomId }));
        expect(result).toStrictEqual((0, either_ts_1.right)({ roomId }));
    });
    it('should return left validation failure when data provided is not valid', function () {
        const converter = new get_room_by_id_converter_1.GetRoomByIdConverter();
        expect(converter.handle(new get_room_by_id_converter_1.GetRoomByIdConverterParams({}))).toStrictEqual((0, either_ts_1.left)(new failures_1.ValidationFailure({ message: get_room_by_id_converter_1.GetRoomByIdConverterErrorMessages.missingId })));
    });
});
