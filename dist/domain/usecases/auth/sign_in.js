"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInUseCaseParams = exports.SignInUseCaseImpl = exports.SignInUsecase = void 0;
class SignInUsecase {
}
exports.SignInUsecase = SignInUsecase;
class SignInUseCaseImpl {
    constructor(repository) {
        this.repository = repository;
    }
    async handle(params) {
        return await this.repository.signIn({
            username: params.username,
            password: params.password,
        });
    }
}
exports.SignInUseCaseImpl = SignInUseCaseImpl;
class SignInUseCaseParams {
    constructor({ username, password }) {
        this.username = username;
        this.password = password;
    }
}
exports.SignInUseCaseParams = SignInUseCaseParams;
