"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const signup_converters_1 = require("./signup_converters");
const either_ts_1 = require("either-ts");
const failures_1 = require("../../../core/failures/failures");
describe('signup converter', function () {
    it('should return a valid object', function () {
        const email = "email@test.com";
        const username = "anzell";
        const password = "123456";
        const result = new signup_converters_1.SignupConverter().handle(new signup_converters_1.SignupConvertersParams({ username, password, email }));
        expect(result).toStrictEqual((0, either_ts_1.right)({ username, password, email }));
    });
    it('should return a left if data passed is invalid', function () {
        let result;
        result = new signup_converters_1.SignupConverter().handle(new signup_converters_1.SignupConvertersParams({ password: "213", email: "test@email.com" }));
        expect(result).toStrictEqual((0, either_ts_1.left)(new failures_1.ValidationFailure({ message: signup_converters_1.SignupConverterErrorMessages.missingUsername })));
        result = new signup_converters_1.SignupConverter().handle(new signup_converters_1.SignupConvertersParams({ username: "anzell", email: "test@email.com" }));
        expect(result).toStrictEqual((0, either_ts_1.left)(new failures_1.ValidationFailure({ message: signup_converters_1.SignupConverterErrorMessages.missingPassword })));
        result = new signup_converters_1.SignupConverter().handle(new signup_converters_1.SignupConvertersParams({ username: "anzell", password: "123456" }));
        expect(result).toStrictEqual((0, either_ts_1.left)(new failures_1.ValidationFailure({ message: signup_converters_1.SignupConverterErrorMessages.missingEmail })));
    });
});
