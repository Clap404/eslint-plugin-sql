"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sql_parse_1 = __importDefault(require("sql-parse"));
exports.default = (literal, ignorePattern) => {
    if (!literal) {
        return false;
    }
    let maybeSql = literal;
    if (ignorePattern) {
        maybeSql = maybeSql.replace(new RegExp(ignorePattern, 'ug'), 'foo');
    }
    try {
        sql_parse_1.default.parse(maybeSql);
    }
    catch (_a) {
        return false;
    }
    return true;
};
