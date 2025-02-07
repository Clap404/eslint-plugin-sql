"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const debug_1 = __importDefault(require("debug"));
const isSqlQuery_1 = __importDefault(require("../utilities/isSqlQuery"));
const debug = (0, debug_1.default)('eslint-plugin-sql:rule:no-unsafe-query');
const defaultOptions = {
    allowLiteral: false,
};
const create = (context) => {
    var _a, _b, _c;
    const placeholderRule = (_b = (_a = context.settings) === null || _a === void 0 ? void 0 : _a.sql) === null || _b === void 0 ? void 0 : _b.placeholderRule;
    const { allowLiteral, } = (_c = context.options[0]) !== null && _c !== void 0 ? _c : defaultOptions;
    return {
        TemplateLiteral(node) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            if (allowLiteral && node.quasis.length === 1) {
                return;
            }
            const literal = node.quasis
                .map((quasi) => {
                return quasi.value.raw;
            })
                .join('foo');
            debug('input', literal);
            const recognizedAsQuery = (0, isSqlQuery_1.default)(literal, placeholderRule);
            debug('recognized as a query', recognizedAsQuery);
            if (!recognizedAsQuery) {
                return;
            }
            const { tag, } = node.parent;
            const tagName = (_e = (_b = (_a = node.parent.tag) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : (_d = (_c = node.parent.tag) === null || _c === void 0 ? void 0 : _c.object) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : (_h = (_g = (_f = node.parent.tag) === null || _f === void 0 ? void 0 : _f.callee) === null || _g === void 0 ? void 0 : _g.object) === null || _h === void 0 ? void 0 : _h.name;
            const legacyTagName = tag === null || tag === void 0 ? void 0 : tag.name.toLowerCase();
            if (legacyTagName !== 'sql' && tagName !== 'sql') {
                context.report({
                    message: 'Use "sql" tag',
                    node,
                });
            }
        },
    };
};
module.exports = {
    create,
    meta: {
        docs: {
            description: 'Disallows use of SQL inside of template literals without the `sql` tag.',
            url: 'https://github.com/gajus/eslint-plugin-sql#no-unsafe-query',
        },
        fixable: 'code',
        schema: [
            {
                additionalProperties: false,
                properties: {
                    allowLiteral: {
                        default: false,
                        type: 'boolean',
                    },
                },
                type: 'object',
            },
        ],
        type: 'problem',
    },
};
