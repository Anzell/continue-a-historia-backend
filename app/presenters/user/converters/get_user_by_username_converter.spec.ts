import {left, right} from "either-ts";
import {FailureHelper} from "../../../core/helper/failure_mapper";
import {
    GetUserByUsernameConverter,
    GetUserByUsernameConverterErrorMessages,
    GetUserByUsernameConverterParams
} from "./get_user_by_username_converter";

describe("get user by username converter", ()=>{
    let converter: GetUserByUsernameConverter;

    beforeEach(()=>{
        converter = new GetUserByUsernameConverter();
    });

    it('deve retornar um objeto com username valido', function () {
        const result = converter.handle({username: "usernameValido"});
        expect(result.map((element)=>element.username)).toStrictEqual(right("usernameValido"));
    });

    it("deve falhar caso algum parametro obrigatorio nao seja passado", () => {
        let result;
        result = converter.handle(new GetUserByUsernameConverterParams({}));
        expect(result.leftMap((failure) => FailureHelper.mapFailureToMessage(failure))).toStrictEqual(left(GetUserByUsernameConverterErrorMessages.missingUsername));
    });
});