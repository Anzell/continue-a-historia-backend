import {TokenData} from "../../domain/entities/token_data";
import * as jwt from "jsonwebtoken";

export interface TokenHelper {
    generateToken(data: TokenData): string;
    decodeToken(data: any): TokenData | undefined;
}

export class TokenHelperImpl implements TokenHelper{
    decodeToken (data: any): TokenData | undefined {
        let token: TokenData | undefined;
        jwt.verify(data, process.env[`JWT_SECRET`]!, (error: any, decoded: any) => {
            if(decoded){
                token = new TokenData({
                    id: decoded['id'],
                    permission: decoded['permission']
                });
            }
        });
        return token;
    }

    generateToken (data: TokenData): string {
        return jwt.sign(data, process.env[`JWT_SECRET`]!);
    }

}