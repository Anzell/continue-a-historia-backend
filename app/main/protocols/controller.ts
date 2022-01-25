import { CustomResponse } from "./custom_response";

export interface Controller {
    handle: (request: any) => Promise<CustomResponse>;
}