"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptSocketMessage = void 0;
const controllers_injector_1 = require("../../di/controllers_injector");
const adaptSocketMessage = async (ws, data) => {
    const controller = await controllers_injector_1.ControllersInjectorFactory.playerEnterInRoomControllerFactory();
    const response = await controller.handle(data);
    ws.send(response.message);
};
exports.adaptSocketMessage = adaptSocketMessage;
