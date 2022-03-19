"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const middlewares_1 = require("./middlewares");
const routes_1 = require("./routes");
const app = express();
middlewares_1.default(app);
routes_1.default(app);
exports.default = app;
