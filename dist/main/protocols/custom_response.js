"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomResponse = void 0;
class CustomResponse {
    constructor({ codeStatus, message, result, code }) {
        this.codeStatus = codeStatus;
        this.message = message;
        this.result = result;
        this.code = code;
    }
}
exports.CustomResponse = CustomResponse;
