import {left, right} from "either-ts";
import {ValidationFailure} from "../../../core/failures/failures";
import {
    GetRoomByIdConverter,
    GetRoomByIdConverterErrorMessages,
    GetRoomByIdConverterParams
} from "./get_room_by_id_converter";

describe('get room by id converter', function () {
    it('should return a valid object when data provided is valid', function () {
        const roomId: string = "validId";
        const converter = new GetRoomByIdConverter();
        const result = converter.handle(new GetRoomByIdConverterParams({roomId}));
        expect(result).toStrictEqual(right({roomId}));
    });

    it('should return left validation failure when data provided is not valid', function () {
        const converter = new GetRoomByIdConverter();
        expect(converter.handle(new GetRoomByIdConverterParams({}))).toStrictEqual(left(new ValidationFailure({message: GetRoomByIdConverterErrorMessages.missingId})));
    });
});