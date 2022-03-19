"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const external_injector_1 = require("./di/external_injector");
const socket_config_1 = require("./main/socket/socket_config");
require("dotenv").config();
class App {
    static async initApp() {
        try {
            await external_injector_1.ExternalInjector.mongoInjector();
            const app = (await Promise.resolve().then(() => require("./main/config/app"))).default;
            const server = app.listen(process.env.PORT || 3000, () => {
                console.log(`Servidor rodando`);
            });
            await (0, socket_config_1.default)(server);
        }
        catch (e) {
            console.log(e);
        }
    }
}
App.initApp();
