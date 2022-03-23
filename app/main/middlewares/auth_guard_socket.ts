import {SocketMiddleware} from "../protocols/middleware";
import {AccessDeniedException} from "../../core/failures/exceptions";
import {TokenData} from "../../domain/entities/token_data";
import {TokenHelper} from "../../core/helper/token_helper";
import {FailureHelper} from "../../core/helper/failure_mapper";
import {Failure} from "../../core/failures/failures";
import {GetUserPermissionsUsecase} from "../../domain/usecases/user/get_user_permissions";
import {Socket} from "socket.io";

export class AuthGuardSocket implements SocketMiddleware {
    private readonly authorized: string[];
    private readonly getUserPermissionUsecase: GetUserPermissionsUsecase;
    private readonly tokenHelper: TokenHelper;

    constructor ({authorized, tokenHelper, getUserPermissionUsecase}: {authorized: string[], tokenHelper: TokenHelper, getUserPermissionUsecase: GetUserPermissionsUsecase}) {
        this.authorized = authorized;
        this.tokenHelper = tokenHelper;
        this.getUserPermissionUsecase = getUserPermissionUsecase;
    }

    async handle (info: Socket): Promise<boolean> {
       
            try{
                if(info.request.headers['authorization'] === undefined || info.request.headers['authorization'].split(' ')[0] !== 'Bearer'){
                    throw new AccessDeniedException();
                }
                let tokenData: TokenData | undefined = this.getAuthorization(info.request.headers['authorization'].split(' ')[1]);
                if (tokenData !== undefined && await this.validatePermission(tokenData)) {
                    return true;
                }
                throw new AccessDeniedException();
            }  catch(e){
                return false;
            }
        
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
                    const response = await this.getUserPermissionUsecase.handle({id: tokenData.id});
                    return await new Promise((resolve, reject) => {
                        response.leftMap((failure: Failure) => {
                            console.log(failure);
                            reject(FailureHelper.mapFailureToMessage(failure));
                        });
                        response.map((permission: string) => {
                            if (this.authorized.some((e) => e === permission)) {
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