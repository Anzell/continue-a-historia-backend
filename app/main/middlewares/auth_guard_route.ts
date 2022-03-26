import {HttpMiddleware} from "../protocols/middleware";
import {CustomResponse} from "../protocols/custom_response";
import {AccessDeniedException} from "../../core/failures/exceptions";
import {TokenData} from "../../domain/entities/token_data";
import {TokenHelper} from "../../core/helper/token_helper";
import {FailureHelper} from "../../core/helper/failure_mapper";
import {Failure} from "../../core/failures/failures";
import {GetUserPermissionsUsecase} from "../../domain/usecases/user/get_user_permissions";
import {RequestHandler} from "express";
import {ServerCodes} from "../../core/constants/messages/server_codes";

export class AuthGuardRoute implements HttpMiddleware {
    private readonly authorized: string[];
    private readonly getUserPermissionUsecase: GetUserPermissionsUsecase;
    private readonly tokenHelper: TokenHelper;

    constructor ({authorized, tokenHelper, getUserPermissionUsecase}: {authorized: string[], tokenHelper: TokenHelper, getUserPermissionUsecase: GetUserPermissionsUsecase}) {
        this.authorized = authorized;
        this.tokenHelper = tokenHelper;
        this.getUserPermissionUsecase = getUserPermissionUsecase;
    }

    async handle(): Promise<RequestHandler>{
        return async (req, res, next) => {
          try{
              if(req.headers['authorization'] === undefined){
                  throw new AccessDeniedException();
              }
              let tokenData: TokenData | undefined = await this.getAuthorization(req.headers['authorization']);
              if (tokenData !== undefined && await this.validatePermission(tokenData)) {
                  req.body['authorizedToken'] = tokenData;
                  return next();
              }
              throw new AccessDeniedException();
          }  catch(e){
              let error: CustomResponse = new CustomResponse({
                  codeStatus: 400,
                  message: "Erro no servidor. Token inválido ou inexistente",
                  code: ServerCodes.acessDenied,
                  result: {}
              });
              if (e instanceof AccessDeniedException) {
                  error = new CustomResponse({
                      codeStatus: 403,
                      message: "Acesso negado",
                      code: ServerCodes.acessDenied,
                      result: {},
                  });
              }
              return res.json(error);
          }
        };
    }

    private getAuthorization(authorization: string): TokenData | undefined {
        try{
            if (authorization) {
                const parts: string[] = authorization.split(" ");
                if (parts.length === 2 && parts[0] === "Bearer") {
                    return this.tokenHelper.decodeToken(parts[1])!;
                }
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