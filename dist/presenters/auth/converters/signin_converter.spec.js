"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const signin_converter_1 = require("./signin_converter");
const either_ts_1 = require("either-ts");
const failures_1 = require("../../../core/failures/failures");
describe('sign in converter', function () {
    let converter;
    beforeEach(() => {
        converter = new signin_converter_1.SignInConverter();
    });
    it('should return a valid object for sign in', function () {
        const expected = {
            email: "email@email.com",
            password: "123456"
        };
        const result = converter.handle(new signin_converter_1.SignInConverterParams({
            email: expected.email,
            password: expected.password
        }));
        expect(result).toStrictEqual((0, either_ts_1.right)(expected));
    });
    it('should return a left with failure messages', function () {
        let result = converter.handle(new signin_converter_1.SignInConverterParams({
            password: "123456"
        }));
        expect(result).toStrictEqual((0, either_ts_1.left)(new failures_1.ValidationFailure({ message: signin_converter_1.SignInConverterErrorMessages.missingEmail })));
        result = converter.handle(new signin_converter_1.SignInConverterParams({
            email: "email@email.com"
        }));
        expect(result).toStrictEqual((0, either_ts_1.left)(new failures_1.ValidationFailure({ message: signin_converter_1.SignInConverterErrorMessages.missingPassword })));
    });
});
