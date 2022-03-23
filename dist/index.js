"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const external_injector_1 = require("./di/external_injector");
const socket_config_1 = require("./main/socket/socket_config");
const http = require("http");
require("dotenv").config();
class App {
    static async initApp() {
        try {
            await external_injector_1.ExternalInjector.mongoInjector();
            const appExpress = (await Promise.resolve().then(() => require("./main/config/app"))).default;
            const httpServer = http.createServer(appExpress);
            (0, socket_config_1.default)(httpServer);
            httpServer.listen(process.env.PORT || 3000);
        }
        catch (e) {
            console.log(e);
        }
    }
}
App.initApp();
