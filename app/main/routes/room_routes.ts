import {Router} from "express";
import {adaptRoute} from "../adapters/express_route_adapter";
import {ControllersInjectorFactory} from "../../di/controllers_injector";

export default async (router: Router): Promise<void> => {
    router.post("/createRoom", adaptRoute(await ControllersInjectorFactory.CreateRoomControllerFactory()))
}