import { Request, Response } from "express";
import {HttpController} from "../protocols/controller";

export const adaptRoute = (controller: HttpController) => {
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