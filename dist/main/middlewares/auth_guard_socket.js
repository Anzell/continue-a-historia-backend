"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuardSocket = void 0;
const exceptions_1 = require("../../core/failures/exceptions");
const failure_mapper_1 = require("../../core/helper/failure_mapper");
class AuthGuardSocket {
    constructor({ authorized, tokenHelper, getUserUsecase }) {
        this.authorized = authorized;
        this.tokenHelper = tokenHelper;
        this.getUserUsecase = getUserUsecase;
    }
    async handle() {
        return async (info, callback) => {
            try {
                if (info.req.url?.split('token=')[1] === undefined) {
                    throw new exceptions_1.AccessDeniedException();
                }
                let tokenData = await this.getAuthorization(info.req.url.split('token=')[1]);
                if (tokenData !== undefined && await this.validatePermission(tokenData)) {
                    return callback(true);
                }
                throw new exceptions_1.AccessDeniedException();
            }
            catch (e) {
                return callback(false);
            }
        };
    }
    getAuthorization(authorization) {
        try {
            if (authorization) {
                return this.tokenHelper.decodeToken(authorization);
            }
            throw new Error();
        }
        catch (e) {
            throw e;
        }
    }
    async validatePermission(tokenData) {
        try {
            if (tokenData) {
                if (tokenData.permission === "user") {
                    console.log(tokenData);
                    const response = await this.getUserUsecase.handle({ id: tokenData.id });
                    return await new Promise((resolve, reject) => {
                        response.leftMap((failure) => {
                            console.log(failure);
                            reject(failure_mapper_1.FailureHelper.mapFailureToMessage(failure));
                        });
                        response.map((user) => {
                            console.log(user);
                            if (this.authorized.some((e) => e === user.permission)) {
                                resolve(true);
                            }
                            else {
                                resolve(false);
                            }
                        });
                    });
                }
            }
            return false;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AuthGuardSocket = AuthGuardSocket;
