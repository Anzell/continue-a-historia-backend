import {
    PlayerEnterInRoomConverter,
    PlayerEnterInRoomConverterErrorMessages,
    PlayerEnterInRoomConverterParams
} from "./player_enter_in_room_converter";
import {left, right} from "either-ts";
import {ValidationFailure} from "../../../core/failures/failures";
import {GetPlayerRoomsConverter, GetPlayerRoomsConverterParams} from "./get_player_rooms_converter";

describe('get player rooms converter', function () {
    it('should return a valid object when data provided is valid', function () {
        const userId: string = "validId";
        const converter = new GetPlayerRoomsConverter();
        const result = converter.handle(new GetPlayerRoomsConverterParams({userId}));
        expect(result).toStrictEqual(right({userId}));
    });

    it('should return left validation failure when data provided is not valid', function () {
        const converter = new PlayerEnterInRoomConverter();
        expect(converter.handle(new PlayerEnterInRoomConverterParams({}))).toStrictEqual(left(new ValidationFailure({message: PlayerEnterInRoomConverterErrorMessages.missingRoomId})));
    });
});