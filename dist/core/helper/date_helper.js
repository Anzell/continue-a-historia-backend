"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateHelper = void 0;
class DateHelper {
    static dateToNumber(date) {
        if (date != null) {
            return date.getTime();
        }
        return undefined;
    }
    static numberToDate(milisseconds) {
        if (milisseconds != null) {
            return new Date(milisseconds);
        }
        return undefined;
    }
}
exports.DateHelper = DateHelper;
