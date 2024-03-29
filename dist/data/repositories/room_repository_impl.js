"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomRepositoryImpl = void 0;
const either_ts_1 = require("either-ts");
const failures_1 = require("../../core/failures/failures");
const exceptions_1 = require("../../core/failures/exceptions");
class RoomRepositoryImpl {
    constructor(datasource) {
        this.datasource = datasource;
    }
    async getPlayerRooms({ userId }) {
        try {
            const result = await this.datasource.getPlayerRooms({ userId });
            return (0, either_ts_1.right)(result);
        }
        catch (e) {
            return (0, either_ts_1.left)(new failures_1.ServerFailure());
        }
    }
    async getRoomById({ id }) {
        try {
            const result = await this.datasource.getRoomById({ id });
            return (0, either_ts_1.right)(result);
        }
        catch (e) {
            if (e instanceof exceptions_1.NotFoundException) {
                return (0, either_ts_1.left)(new failures_1.NotFoundFailure());
            }
            return (0, either_ts_1.left)(new failures_1.ServerFailure());
        }
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
    async insertPlayer({ userId, roomId }) {
        try {
            await this.datasource.insertPlayer({ userId, roomId });
            return (0, either_ts_1.right)(null);
        }
        catch (e) {
            return (0, either_ts_1.left)(new failures_1.ServerFailure());
        }
    }
    async sendPhrase({ userId, roomId, phrase }) {
        try {
            const result = await this.datasource.sendPhrase({ userId, roomId, phrase });
            return (0, either_ts_1.right)(result);
        }
        catch (e) {
            return (0, either_ts_1.left)(new failures_1.ServerFailure());
        }
    }
    async updateRoom({ roomData }) {
        try {
            await this.datasource.updateRoom({ roomData });
            return (0, either_ts_1.right)(null);
        }
        catch (e) {
            if (e instanceof exceptions_1.NotFoundException) {
                return (0, either_ts_1.left)(new failures_1.NotFoundFailure());
            }
            return (0, either_ts_1.left)(new failures_1.ServerFailure());
        }
    }
}
exports.RoomRepositoryImpl = RoomRepositoryImpl;
