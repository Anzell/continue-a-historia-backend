"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenHelperImpl = void 0;
const token_data_1 = require("../../domain/entities/token_data");
const jwt = require("jsonwebtoken");
class TokenHelperImpl {
    decodeToken(data) {
        let token;
        jwt.verify(data, process.env[`JWT_SECRET`], (error, decoded) => {
            if (decoded) {
                token = new token_data_1.TokenData({
                    id: decoded['id'],
                    permission: decoded['permission']
                });
            }
        });
        return token;
    }
    generateToken(data) {
        return jwt.sign(data, process.env[`JWT_SECRET`]);
    }
}
exports.TokenHelperImpl = TokenHelperImpl;
