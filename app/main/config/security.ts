import {Express} from "express";

export default (app: Express) => {
  app.disable("x-powered-by");
};