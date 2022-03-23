import * as express from "express";
import setupMiddleware from "./middlewares";
import setupRoutes from "./routes";
import * as path from "path";

const app = express();
setupMiddleware(app);
setupRoutes(app);
export default app;