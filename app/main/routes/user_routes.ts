import {Router} from "express";
import {ControllersInjectorFactory} from "../../di/controllers_injector";
import {adaptRoute} from "../adapters/express_route_adapter";

export default async (router: Router): Promise<void> => {
    router.get("/user/:id", await (await ControllersInjectorFactory.authGuardRouteFactory("user")).handle(), adaptRoute(await ControllersInjectorFactory.getUserByIdControllerFactory()))
}