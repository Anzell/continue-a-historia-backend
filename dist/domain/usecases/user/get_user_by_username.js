"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByUsernameUsecaseParams = exports.GetUserByUsernameUsecase = void 0;
class GetUserByUsernameUsecase {
    constructor(repository) {
        this.repository = repository;
    }
    async handle(params) {
        return await this.repository.getUserByUsername({ username: params.username });
    }
}
exports.GetUserByUsernameUsecase = GetUserByUsernameUsecase;
class GetUserByUsernameUsecaseParams {
    constructor({ username }) {
        this.username = username;
    }
}
exports.GetUserByUsernameUsecaseParams = GetUserByUsernameUsecaseParams;
