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
            email: params.email,
            password: params.password,
        });
    }
}
exports.SignInUseCaseImpl = SignInUseCaseImpl;
class SignInUseCaseParams {
    constructor({ email, password }) {
        this.email = email;
        this.password = password;
    }
}
exports.SignInUseCaseParams = SignInUseCaseParams;
