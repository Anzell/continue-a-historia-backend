import {ExternalInjector} from "./di/external_injector";
import initSocket from "./main/socket/socket_config";
import * as http from "http";

require("dotenv").config();
class App {
    static async initApp(): Promise<void> {
        try{
            await ExternalInjector.mongoInjector();
            const appExpress = (await import("./main/config/app")).default;
            const httpServer = http.createServer(appExpress);
            initSocket(httpServer);
            httpServer.listen(process.env.PORT || 3000);
        }catch (e){
            console.log(e);
        }
    }
}

App.initApp();
