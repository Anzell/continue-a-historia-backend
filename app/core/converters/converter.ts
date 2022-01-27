import * as Either from "either-ts";
import {Failure} from "../failures/failures";

export interface Converter<TypeReturn, Params>{
    handle: (params: Params) => Either<Failure, TypeReturn>;
}


