"use strict";
require("dotenv").config();
class App {
    static async initApp() {
        try {
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
