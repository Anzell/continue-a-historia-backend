import {Router} from "express";
import {adaptRoute} from "../adapters/express_route_adapter";
import {ControllersInjectorFactory} from "../../di/controllers_injector";

export default async (router: Router): Promise<void> => {
    router.post("/createRoom", await (await ControllersInjectorFactory.authGuardRouteFactory("user")).handle(), adaptRoute(await ControllersInjectorFactory.createRoomControllerFactory()))
    router.get("/rooms/:userId", await (await ControllersInjectorFactory.authGuardRouteFactory("user")).handle(), adaptRoute(await ControllersInjectorFactory.getPlayerRoomsControllerFactory()))
}