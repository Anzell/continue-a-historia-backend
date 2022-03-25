"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepositoryImpl = void 0;
const failures_1 = require("../../core/failures/failures");
const exceptions_1 = require("../../core/failures/exceptions");
const either_ts_1 = require("either-ts");
class AuthRepositoryImpl {
    constructor(datasource) {
        this.datasource = datasource;
    }
    async signUp({ username, password, email }) {
        try {
            await this.datasource.signUp({ username, password, email });
            return (0, either_ts_1.right)(null);
        }
        catch (e) {
            if (e instanceof exceptions_1.UsernameAlreadyExistException) {
                return (0, either_ts_1.left)(new failures_1.UsernameAlreadyExistFailure());
            }
            if (e instanceof exceptions_1.EmailAlreadyExistException) {
                return (0, either_ts_1.left)(new failures_1.EmailAlreadyExistFailure());
            }
            return (0, either_ts_1.left)(new failures_1.ServerFailure());
        }
    }
    async signIn({ username, password }) {
        try {
            const result = await this.datasource.signIn({ username, password });
            return (0, either_ts_1.right)(result);
        }
        catch (e) {
            if (e instanceof exceptions_1.InvalidCredentialsException) {
                return (0, either_ts_1.left)(new failures_1.InvalidCredentialsFailure());
            }
            return (0, either_ts_1.left)(new failures_1.ServerFailure());
        }
    }
}
exports.AuthRepositoryImpl = AuthRepositoryImpl;
