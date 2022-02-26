"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpUsecaseParams = exports.SignUpUsecaseImpl = exports.SignUpUsecase = void 0;
class SignUpUsecase {
}
exports.SignUpUsecase = SignUpUsecase;
class SignUpUsecaseImpl {
    constructor(repository) {
        this.repository = repository;
    }
    async handle(params) {
        return await this.repository.signUp({
            username: params.username,
            password: params.password,
            email: params.email,
        });
    }
}
exports.SignUpUsecaseImpl = SignUpUsecaseImpl;
class SignUpUsecaseParams {
    constructor({ username, password, email }) {
        this.username = username;
        this.password = password;
        this.email = email;
    }
}
exports.SignUpUsecaseParams = SignUpUsecaseParams;
