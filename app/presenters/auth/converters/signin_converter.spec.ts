import {SignInConverter, SignInConverterErrorMessages, SignInConverterParams} from "./signin_converter";
import {left, right} from "either-ts";
import {ValidationFailure} from "../../../core/failures/failures";

describe('sign in converter', function () {
    let converter: SignInConverter;

    beforeEach(() => {
       converter= new SignInConverter();
    });

    it('should return a valid object for sign in', function () {
        const expected = {
            email: "email@email.com",
            password: "123456"
        };
        const result = converter.handle(new SignInConverterParams({
            email: expected.email,
            password: expected.password
        }));
        expect(result).toStrictEqual(right(expected));
    });

    it('should return a left with failure messages', function () {
        let result = converter.handle(new SignInConverterParams({
            password: "123456"
        }));
        expect(result).toStrictEqual(left(new ValidationFailure({message: SignInConverterErrorMessages.missingEmail})));
        result = converter.handle(new SignInConverterParams({
            email: "email@email.com"
        }));
        expect(result).toStrictEqual(left(new ValidationFailure({message: SignInConverterErrorMessages.missingPassword})));
    });
});