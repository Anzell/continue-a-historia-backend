"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_route_adapter_1 = require("../adapters/express_route_adapter");
const controllers_injector_1 = require("../../di/controllers_injector");
exports.default = async (router) => {
    router.post("/createRoom", await (await controllers_injector_1.ControllersInjectorFactory.authGuardRouteFactory("user")).handle(), (0, express_route_adapter_1.adaptRoute)(await controllers_injector_1.ControllersInjectorFactory.createRoomControllerFactory()));
};
