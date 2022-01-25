"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const express_1 = require("express");
exports.default = (app) => {
    const router = express_1.Router();
    app.use("/api", router);
    fs_1.readdirSync(`${__dirname}/../routes`).map(async (file) => {
        if (!file.includes(".test.")) {
            (await Promise.resolve().then(() => require(`../routes/${file}`))).default(router);
        }
    });
};
