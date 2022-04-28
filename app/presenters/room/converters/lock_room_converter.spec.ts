import {left, right} from "either-ts";
import {ValidationFailure} from "../../../core/failures/failures";
import {LockRoomConverter, LockRoomConverterErrorMessages, LockRoomConverterParams} from "./lock_room_converter";

describe('lock room converter', function () {
    it('should return a valid object when data provided is valid', function () {
        const roomId: string = "validId";
        const userId: string = "validId";
        const lock: boolean = true;
        const converter = new LockRoomConverter();
        const result = converter.handle(new LockRoomConverterParams({roomId, userId, lock}));
        expect(result).toStrictEqual(right({roomId, userId, lock}));
    });

    it('should return left validation failure when data provided is not valid', function () {
        let converter = new LockRoomConverter();
        expect(converter.handle(new LockRoomConverterParams({roomId: "validId", lock: false}))).toStrictEqual(left(new ValidationFailure({message: LockRoomConverterErrorMessages.missingUserId})));
        converter = new LockRoomConverter();
        expect(converter.handle(new LockRoomConverterParams({userId: "validId", lock: false}))).toStrictEqual(left(new ValidationFailure({message: LockRoomConverterErrorMessages.missingRoomId})));
        converter = new LockRoomConverter();
        expect(converter.handle(new LockRoomConverterParams({userId: "validId", roomId: "validId"}))).toStrictEqual(left(new ValidationFailure({message: LockRoomConverterErrorMessages.missingLockInfo})));
    });
});