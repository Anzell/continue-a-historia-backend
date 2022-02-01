import {
    PlayerEnterInRoomConverter,
    PlayerEnterInRoomConverterErrorMessages,
    PlayerEnterInRoomConverterParams
} from "./player_enter_in_room_converter";
import {left, right} from "either-ts";
import {ValidationFailure} from "../../../core/failures/failures";

describe('player enter in room converter', function () {

    it('should return a valid object when data provided is valid', function () {
        const userId: string = "validId";
        const roomId: string = "validId";
        const converter = new PlayerEnterInRoomConverter();
        const result = converter.handle(new PlayerEnterInRoomConverterParams({userId, roomId}));
        expect(result).toStrictEqual(right({userId, roomId}));
    });

    it('should return left validation failure when data provided is not valid', function () {
        const converter = new PlayerEnterInRoomConverter();
        expect(converter.handle(new PlayerEnterInRoomConverterParams({userId: "validId"}))).toStrictEqual(left(new ValidationFailure({message: PlayerEnterInRoomConverterErrorMessages.missingRoomId})));
        expect(converter.handle(new PlayerEnterInRoomConverterParams({roomId: "validId"}))).toStrictEqual(left(new ValidationFailure({message: PlayerEnterInRoomConverterErrorMessages.missingUserId})));
    });

});