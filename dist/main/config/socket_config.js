"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
const ws = new WebSocket('ws://www.host.com/path');
ws.on('open', function open() {
    ws.send('something');
});
ws.on('message', function message(data) {
    console.log('received: %s', data);
});
