"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptRoute = void 0;
const adaptRoute = (controller) => {
    return async (req, resp) => {
        console.log(req.socket.remoteAddress);
        const request = {
            ...(req.body || {}),
            ...(req.params || {}),
            ...(req.query || {})
        };
        const httpReponse = await controller.handle(request);
        resp.status(httpReponse.codeStatus).json(httpReponse);
    };
};
exports.adaptRoute = adaptRoute;
