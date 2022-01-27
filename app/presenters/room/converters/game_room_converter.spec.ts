import {GameRoomConverter, GameRoomConverterErrorMessages, GameRoomConverterParams} from "./game_room_converter";
import {left, right} from "either-ts";
import {FailureHelper} from "../../../core/helper/failure_mapper";

describe("game room converter", ()=>{
    let converter: GameRoomConverter;

    beforeEach(()=>{
       converter = new GameRoomConverter();
    });

    it('deve retornar um GameRoom valido', function () {
        const result = converter.handle(new GameRoomConverterParams({
            name: "Sala de testes",
            adminsIds: ["admin1"]
        }));
        expect(result.map((element)=>element.name)).toStrictEqual(right("Sala de testes"));
    });

    it("deve falhar caso algum parametro obrigatorio nao seja passado", () => {
        let result;
        result = converter.handle(new GameRoomConverterParams({}));
        expect(result.leftMap((failure) => FailureHelper.mapFailureToMessage(failure))).toStrictEqual(left(GameRoomConverterErrorMessages.missingName));
        result = converter.handle(new GameRoomConverterParams({name: "sala teste"}));
        expect(result.leftMap((failure) => FailureHelper.mapFailureToMessage(failure))).toStrictEqual(left(GameRoomConverterErrorMessages.missingAdmins));
    });
});