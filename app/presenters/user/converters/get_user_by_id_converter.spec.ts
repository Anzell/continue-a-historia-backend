import {left, right} from "either-ts";
import {FailureHelper} from "../../../core/helper/failure_mapper";
import {
    GetUserByIdConverter,
    GetUserByIdConverterErrorMessages,
    GetUserByIdConverterParams
} from "./get_user_by_id_converter";

describe("get user by id converter", ()=>{
    let converter: GetUserByIdConverter;

    beforeEach(()=>{
        converter = new GetUserByIdConverter();
    });

    it('deve retornar um objeto com id válido', function () {
        const result = converter.handle({id: "validId"});
        expect(result.map((element)=>element.id)).toStrictEqual(right("validId"));
    });

    it("deve falhar caso algum parametro obrigatorio nao seja passado", () => {
        let result;
        result = converter.handle(new GetUserByIdConverterParams({}));
        expect(result.leftMap((failure) => FailureHelper.mapFailureToMessage(failure))).toStrictEqual(left(GetUserByIdConverterErrorMessages.missingId));
    });
});