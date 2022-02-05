import { CustomResponse } from "./custom_response";
import {CustomMessage} from "./custom_message";

export interface HttpController {
    handle: (request: any) => Promise<CustomResponse>;
}

export interface SocketController {
    handle: (request: any) => Promise<CustomMessage>;
}