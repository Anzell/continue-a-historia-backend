"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const express_1 = require("express");
exports.default = (app) => {
    const router = (0, express_1.Router)();
    app.use("/api", router);
    (0, fs_1.readdirSync)(`${__dirname}/../routes`).map(async (file) => {
        if (!file.includes(".spec.")) {
            (await Promise.resolve().then(() => require(`../routes/${file}`))).default(router);
        }
    });
};
