"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringHelperImpl = void 0;
class StringHelperImpl {
    constructor(uuid) {
        this.uuid = uuid;
    }
    generateUuid() {
        return this.uuid();
    }
}
exports.StringHelperImpl = StringHelperImpl;
