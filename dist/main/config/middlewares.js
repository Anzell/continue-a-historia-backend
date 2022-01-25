"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("../middlewares/body_parser");
const content_type_1 = require("../middlewares/content_type");
const cors_1 = require("../middlewares/cors");
exports.default = (app) => {
    app.use(body_parser_1.bodyParser);
    app.use(cors_1.cors);
    app.use(content_type_1.contentType);
};
