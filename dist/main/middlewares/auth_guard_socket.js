"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuardSocket = void 0;
const exceptions_1 = require("../../core/failures/exceptions");
const failure_mapper_1 = require("../../core/helper/failure_mapper");
class AuthGuardSocket {
    constructor({ authorized, tokenHelper, getUserPermissionUsecase }) {
        this.authorized = authorized;
        this.tokenHelper = tokenHelper;
        this.getUserPermissionUsecase = getUserPermissionUsecase;
    }
    async handle(info) {
        try {
            if (info.request.headers['authorization'] === undefined || info.request.headers['authorization'].split(' ')[0] !== 'Bearer') {
                throw new exceptions_1.AccessDeniedException();
            }
            let tokenData = this.getAuthorization(info.request.headers['authorization'].split(' ')[1]);
            if (tokenData !== undefined && await this.validatePermission(tokenData)) {
                return true;
            }
            throw new exceptions_1.AccessDeniedException();
        }
        catch (e) {
            return false;
        }
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
                    const response = await this.getUserPermissionUsecase.handle({ id: tokenData.id });
                    return await new Promise((resolve, reject) => {
                        response.leftMap((failure) => {
                            console.log(failure);
                            reject(failure_mapper_1.FailureHelper.mapFailureToMessage(failure));
                        });
                        response.map((permission) => {
                            if (this.authorized.some((e) => e === permission)) {
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
