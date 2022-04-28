"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertersInjector = void 0;
const game_room_converter_1 = require("../presenters/room/converters/game_room_converter");
const signup_converters_1 = require("../presenters/auth/converters/signup_converters");
const player_enter_in_room_converter_1 = require("../presenters/room/converters/player_enter_in_room_converter");
const player_send_phrase_to_history_converter_1 = require("../presenters/room/converters/player_send_phrase_to_history_converter");
const get_user_by_id_converter_1 = require("../presenters/user/converters/get_user_by_id_converter");
const get_player_rooms_converter_1 = require("../presenters/room/converters/get_player_rooms_converter");
const get_room_by_id_converter_1 = require("../presenters/room/converters/get_room_by_id_converter");
const get_user_by_username_converter_1 = require("../presenters/user/converters/get_user_by_username_converter");
const lock_room_converter_1 = require("../presenters/room/converters/lock_room_converter");
class ConvertersInjector {
    static async gameRoomConverterFactory() {
        return new game_room_converter_1.GameRoomConverter();
    }
    static async signUpConverterFactory() {
        return new signup_converters_1.SignupConverter();
    }
    static async playerEnterInRoomConverterFactory() {
        return new player_enter_in_room_converter_1.PlayerEnterInRoomConverter();
    }
    static async playerSendPhraseToHistoryConverterFactory() {
        return new player_send_phrase_to_history_converter_1.PlayerSendPhraseToHistoryConverter();
    }
    static async getUserByIdConverterFactory() {
        return new get_user_by_id_converter_1.GetUserByIdConverter();
    }
    static async getPlayerRoomsConverterFactory() {
        return new get_player_rooms_converter_1.GetPlayerRoomsConverter();
    }
    static async getRoomByIdConverterFactory() {
        return new get_room_by_id_converter_1.GetRoomByIdConverter();
    }
    static async getUserByUsernameConverterFactory() {
        return new get_user_by_username_converter_1.GetUserByUsernameConverter();
    }
    static async lockRoomConverterFactory() {
        return new lock_room_converter_1.LockRoomConverter();
    }
}
exports.ConvertersInjector = ConvertersInjector;
