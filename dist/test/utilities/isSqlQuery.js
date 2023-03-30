"use strict";
/* global describe */
/* global it */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const isSqlQuery_1 = __importDefault(require("../../src/utilities/isSqlQuery"));
describe('isSqlQuery', () => {
    it('recognizes SQL input', () => {
        (0, assert_1.default)((0, isSqlQuery_1.default)('SELECT 1'));
    });
    it('recognizes SQL input after ignoring defined patterns', () => {
        (0, assert_1.default)((0, isSqlQuery_1.default)('SELECT ? FROM bar', '\\?'));
    });
    it('distinguishes from non-SQL input', () => {
        (0, assert_1.default)(!(0, isSqlQuery_1.default)('foo bar'));
        (0, assert_1.default)(!(0, isSqlQuery_1.default)('foo SELECT FROM bar'));
    });
});
