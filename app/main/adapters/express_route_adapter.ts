import { Request, Response } from "express";
import {Controller} from "../protocols/controller";

export const adaptRoute = (controller: Controller) => {
    return async (req: Request, resp: Response) => {
        const request = {
            ...(req.body || {}),
            ...(req.params || {}),
            ...(req.query || {})
        }
        const httpReponse = await controller.handle(request);
        resp.status(httpReponse.codeStatus).json(httpReponse);
    }
};