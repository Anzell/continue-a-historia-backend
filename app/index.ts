import {ExternalInjector} from "./di/external_injector";
import initSocket from "./main/socket/socket_config";
import {Server} from "http";

require("dotenv").config();

class App {
    static async initApp(): Promise<void> {
        try{
            await ExternalInjector.mongoInjector();
            const app = (await import("./main/config/app")).default;
            const server: Server = app.listen(process.env.PORT || 3000, () => {
                  console.log(`Servidor rodando`);
              });
            await initSocket(server);
        }catch (e){
            console.log(e);
        }
    }
}

App.initApp();