import {
    GetRoomByIdConverter,
    GetRoomByIdConverterErrorMessages,
    GetRoomByIdConverterParams
} from "./get_room_by_id_converter";
import {left, right} from "either-ts";
import {ValidationFailure} from "../../../core/failures/failures";
import {LockRoomConverter, LockRoomConverterErrorMessages, LockRoomConverterParams} from "./lock_room_converter";

describe('lock room converter', function () {
    it('should return a valid object when data provided is valid', function () {
        const roomId: string = "validId";
        const userId: string = "validId";
        const converter = new LockRoomConverter();
        const result = converter.handle(new LockRoomConverterParams({roomId, userId}));
        expect(result).toStrictEqual(right({roomId, userId}));
    });

    it('should return left validation failure when data provided is not valid', function () {
        let converter = new LockRoomConverter();
        expect(converter.handle(new LockRoomConverterParams({roomId: "validId"}))).toStrictEqual(left(new ValidationFailure({message: LockRoomConverterErrorMessages.missingUserId})));
        converter = new LockRoomConverter();
        expect(converter.handle(new LockRoomConverterParams({userId: "validId"}))).toStrictEqual(left(new ValidationFailure({message: LockRoomConverterErrorMessages.missingRoomId})));
    });
});