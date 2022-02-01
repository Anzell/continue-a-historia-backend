"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const external_injector_1 = require("./di/external_injector");
require("dotenv").config();
class App {
    static async initApp() {
        try {
            await external_injector_1.ExternalInjector.mongoInjector();
            const app = (await Promise.resolve().then(() => require("./main/config/app"))).default;
            app.listen(process.env.PORT || 3000, () => {
                console.log(`Servidor rodando`);
            });
        }
        catch (e) {
            console.log(e);
        }
    }
}
App.initApp();
