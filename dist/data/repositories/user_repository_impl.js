"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryImpl = void 0;
const failures_1 = require("../../core/failures/failures");
const either_ts_1 = require("either-ts");
const exceptions_1 = require("../../core/failures/exceptions");
class UserRepositoryImpl {
    constructor(datasource) {
        this.datasource = datasource;
    }
    async getUserById({ id }) {
        try {
            const result = await this.datasource.getUserById({ id });
            return (0, either_ts_1.right)(result);
        }
        catch (e) {
            if (e instanceof exceptions_1.NotFoundException) {
                return (0, either_ts_1.left)(new failures_1.NotFoundFailure());
            }
            return (0, either_ts_1.left)(new failures_1.ServerFailure());
        }
    }
    async getUserPermissions({ id }) {
        try {
            const result = await this.datasource.getUserPermissions({ id });
            return (0, either_ts_1.right)(result);
        }
        catch (e) {
            if (e instanceof exceptions_1.NotFoundException) {
                return (0, either_ts_1.left)(new failures_1.NotFoundFailure());
            }
            return (0, either_ts_1.left)(new failures_1.ServerFailure());
        }
    }
}
exports.UserRepositoryImpl = UserRepositoryImpl;
