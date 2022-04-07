import * as express from "express";
import setupMiddleware from "./middlewares";
import setupRoutes from "./routes";
import setupSecurity from "./security";

const app = express();
setupMiddleware(app);
setupRoutes(app);
setupSecurity(app);
export default app;