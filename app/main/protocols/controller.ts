import { CustomResponse } from "./custom_response";
import {CustomMessage} from "./custom_message";

export interface Controller {
    handle: (request: any) => Promise<CustomResponse>;
}