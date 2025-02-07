"use strict";
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eslint_1 = require("eslint");
const lodash_1 = require("lodash");
const src_1 = __importDefault(require("../../src"));
const ruleTester = new eslint_1.RuleTester({
    parserOptions: {
        ecmaVersion: 'latest',
    },
});
const reportingRules = [
    'format',
    'no-unsafe-query',
];
for (const ruleName of reportingRules) {
    const assertions = require('./assertions/' + (0, lodash_1.camelCase)(ruleName));
    ruleTester.run(ruleName, src_1.default.rules[ruleName], assertions.default);
}
