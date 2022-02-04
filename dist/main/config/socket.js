"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
exports.default = (server) => {
    const ws = new WebSocket.Server({ server: server });
    ws.on('connection', onConnection);
    console.log(`App Web Socket Server is running!`);
    console.log(ws.address());
};
function onError(ws, err) {
    console.error(`onError: ${err.message}`);
}
function onMessage(ws, data) {
    console.log(`onMessage: ${data}`);
    ws.send(`recebido!`);
}
function onConnection(ws, req) {
    ws.on('message', (data) => onMessage(ws, data));
    ws.on('error', (error) => onError(ws, error));
    console.log(`onConnection`);
}
