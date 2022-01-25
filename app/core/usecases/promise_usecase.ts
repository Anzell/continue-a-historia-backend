import * as Either from "either-ts";
import { Failure } from "../failures/failures";

export interface PromiseUsecase<TypeReturn, Params>{
    handle: (params: Params) => Promise<Either<Failure, TypeReturn>>;
}