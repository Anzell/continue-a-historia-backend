"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomRepositoryImpl = void 0;
const either_ts_1 = require("either-ts");
const failures_1 = require("../../core/failures/failures");
class RoomRepositoryImpl {
    constructor(datasource) {
        this.datasource = datasource;
    }
    async createRoom(room) {
        try {
            await this.datasource.createRoom(room);
            return (0, either_ts_1.right)(null);
        }
        catch (e) {
            return (0, either_ts_1.left)(new failures_1.ServerFailure());
        }
    }
}
exports.RoomRepositoryImpl = RoomRepositoryImpl;
