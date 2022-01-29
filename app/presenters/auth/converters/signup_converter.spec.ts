import {SignupConverter, SignupConverterErrorMessages, SignupConvertersParams} from "./signup_converters";
import {left, right} from "either-ts";
import {ValidationFailure} from "../../../core/failures/failures";

describe('signup converter', function () {
    it('should return a valid object', function () {
        const email = "email@test.com";
        const username = "anzell";
        const password = "123456";

        const result = new SignupConverter().handle(new SignupConvertersParams({username, password, email}));
        expect(result).toStrictEqual(right({username, password, email}));
    });

    it('should return a left if data passed is invalid', function () {
        let result;
        result = new SignupConverter().handle(new SignupConvertersParams({password: "213", email:"test@email.com"}));
        expect(result).toStrictEqual(left(new ValidationFailure({message: SignupConverterErrorMessages.missingUsername})));
        result = new SignupConverter().handle(new SignupConvertersParams({username: "anzell", email:"test@email.com"}));
        expect(result).toStrictEqual(left(new ValidationFailure({message: SignupConverterErrorMessages.missingPassword})));
        result = new SignupConverter().handle(new SignupConvertersParams({username: "anzell", password:"123456"}));
        expect(result).toStrictEqual(left(new ValidationFailure({message: SignupConverterErrorMessages.missingEmail})));

    });
});