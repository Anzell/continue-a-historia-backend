"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const middlewares_1 = require("./middlewares");
const routes_1 = require("./routes");
const app = express();
(0, middlewares_1.default)(app);
(0, routes_1.default)(app);
exports.default = app;
