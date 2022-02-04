"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuardRoute = void 0;
const custom_response_1 = require("../protocols/custom_response");
const exceptions_1 = require("../../core/failures/exceptions");
const failure_mapper_1 = require("../../core/helper/failure_mapper");
class AuthGuardRoute {
    constructor({ authorized, tokenHelper, getUserUsecase }) {
        this.authorized = authorized;
        this.tokenHelper = tokenHelper;
        this.getUserUsecase = getUserUsecase;
    }
    async handle() {
        return async (req, res, next) => {
            try {
                if (req.headers['authorization'] === undefined) {
                    throw new exceptions_1.AccessDeniedException();
                }
                let tokenData = await this.getAuthorization(req.headers['authorization']);
                if (tokenData !== undefined && await this.validatePermission(tokenData)) {
                    req.body['authorizedToken'] = tokenData;
                    return next();
                }
                throw new exceptions_1.AccessDeniedException();
            }
            catch (e) {
                let error = new custom_response_1.CustomResponse({
                    codeStatus: 400,
                    message: "Erro no servidor. Token inválido ou inexistente",
                    result: {}
                });
                if (e instanceof exceptions_1.AccessDeniedException) {
                    error = new custom_response_1.CustomResponse({
                        codeStatus: 403,
                        message: "Acesso negado",
                        result: {},
                    });
                }
                return res.json(error);
            }
        };
    }
    getAuthorization(authorization) {
        try {
            if (authorization) {
                const parts = authorization.split(" ");
                if (parts.length === 2 && parts[0] === "Bearer") {
                    return this.tokenHelper.decodeToken(parts[1]);
                }
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
                    const response = await this.getUserUsecase.handle({ id: tokenData.id });
                    return await new Promise((resolve, reject) => {
                        response.leftMap((failure) => {
                            reject(failure_mapper_1.FailureHelper.mapFailureToMessage(failure));
                        });
                        response.map((user) => {
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
exports.AuthGuardRoute = AuthGuardRoute;
