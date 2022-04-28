"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const either_ts_1 = require("either-ts");
const failures_1 = require("../../../core/failures/failures");
const lock_room_converter_1 = require("./lock_room_converter");
describe('lock room converter', function () {
    it('should return a valid object when data provided is valid', function () {
        const roomId = "validId";
        const userId = "validId";
        const lock = true;
        const converter = new lock_room_converter_1.LockRoomConverter();
        const result = converter.handle(new lock_room_converter_1.LockRoomConverterParams({ roomId, userId, lock }));
        expect(result).toStrictEqual((0, either_ts_1.right)({ roomId, userId, lock }));
    });
    it('should return left validation failure when data provided is not valid', function () {
        let converter = new lock_room_converter_1.LockRoomConverter();
        expect(converter.handle(new lock_room_converter_1.LockRoomConverterParams({ roomId: "validId", lock: false }))).toStrictEqual((0, either_ts_1.left)(new failures_1.ValidationFailure({ message: lock_room_converter_1.LockRoomConverterErrorMessages.missingUserId })));
        converter = new lock_room_converter_1.LockRoomConverter();
        expect(converter.handle(new lock_room_converter_1.LockRoomConverterParams({ userId: "validId", lock: false }))).toStrictEqual((0, either_ts_1.left)(new failures_1.ValidationFailure({ message: lock_room_converter_1.LockRoomConverterErrorMessages.missingRoomId })));
        converter = new lock_room_converter_1.LockRoomConverter();
        expect(converter.handle(new lock_room_converter_1.LockRoomConverterParams({ userId: "validId", roomId: "validId" }))).toStrictEqual((0, either_ts_1.left)(new failures_1.ValidationFailure({ message: lock_room_converter_1.LockRoomConverterErrorMessages.missingLockInfo })));
    });
});
