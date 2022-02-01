import {ExternalInjector} from "./di/external_injector";

require("dotenv").config();

class App {
    static async initApp(): Promise<void> {
        try{
            await ExternalInjector.mongoInjector();
            const app = (await import("./main/config/app")).default;
              app.listen(process.env.PORT || 3000, () => {
                  console.log(`Servidor rodando`);
              });
        }catch (e){
            console.log(e);
        }
    }
}

App.initApp();