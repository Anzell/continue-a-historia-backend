import {Middleware} from "../protocols/middleware";
import {AccessDeniedException} from "../../core/failures/exceptions";
import {TokenData} from "../../domain/entities/token_data";
import {TokenHelper} from "../../core/helper/token_helper";
import {GetUserByIdUsecase} from "../../domain/usecases/user/get_user_by_id";
import {FailureHelper} from "../../core/helper/failure_mapper";
import {UserEntity} from "../../domain/entities/user_entity";
import {Failure} from "../../core/failures/failures";
import {VerifyClientCallbackAsync} from "ws";

export class AuthGuardSocket implements Middleware {
    private readonly authorized: string[];
    private readonly getUserUsecase: GetUserByIdUsecase;
    private readonly tokenHelper: TokenHelper;

    constructor ({authorized, tokenHelper, getUserUsecase}: {authorized: string[], tokenHelper: TokenHelper, getUserUsecase: GetUserByIdUsecase}) {
        this.authorized = authorized;
        this.tokenHelper = tokenHelper;
        this.getUserUsecase = getUserUsecase;
    }

    async handle(): Promise<VerifyClientCallbackAsync> {
        return async (info, callback) => {
            try{
                if(info.req.url?.split('token=')[1] === undefined){
                    throw new AccessDeniedException();
                }
                let tokenData: TokenData | undefined = await this.getAuthorization(info.req.url.split('token=')[1]);
                if (tokenData !== undefined && await this.validatePermission(tokenData)) {
                    return callback(true);
                }
                throw new AccessDeniedException();
            }  catch(e){
                return callback(false);
            }
        };
    }

    private getAuthorization(authorization: string): TokenData | undefined {
        try{
            if (authorization) {
                    return this.tokenHelper.decodeToken(authorization)!;
            }
            throw new Error();
        }catch (e){
            throw e;
        }
    }

    private async validatePermission(tokenData: TokenData): Promise<boolean> {
        try {
            if (tokenData) {
                if (tokenData.permission === "user") {
                    console.log(tokenData);
                    const response = await this.getUserUsecase.handle({id: tokenData.id});
                    return await new Promise((resolve, reject) => {
                        response.leftMap((failure: Failure) => {
                            console.log(failure);
                            reject(FailureHelper.mapFailureToMessage(failure));
                        });
                        response.map((user: UserEntity) => {
                            console.log(user);
                            if (this.authorized.some((e) => e === user.permission)) {
                                resolve(true);
                            } else {
                                resolve(false);
                            }
                        });
                    });
                }
            }
            return false;
        } catch (e) {
            throw e;
        }
    }
}