"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserPermissionsUsecaseParams = exports.GetUserPermissionsUsecase = void 0;
class GetUserPermissionsUsecase {
    constructor(repository) {
        this.repository = repository;
    }
    async handle(params) {
        return await this.repository.getUserPermissions({ id: params.id });
    }
}
exports.GetUserPermissionsUsecase = GetUserPermissionsUsecase;
class GetUserPermissionsUsecaseParams {
    constructor({ id }) {
        this.id = id;
    }
}
exports.GetUserPermissionsUsecaseParams = GetUserPermissionsUsecaseParams;
