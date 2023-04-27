"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const astring_1 = require("astring");
const sql_formatter_1 = require("sql-formatter");
const isSqlQuery_1 = __importDefault(require("../utilities/isSqlQuery"));
const create = (context) => {
    var _a, _b, _c;
    const placeholderRule = (_b = (_a = context.settings) === null || _a === void 0 ? void 0 : _a.sql) === null || _b === void 0 ? void 0 : _b.placeholderRule;
    const sqlFormatterOptions = context.options[1];
    const pluginOptions = (_c = context.options) === null || _c === void 0 ? void 0 : _c[0];
    const ignoreExpressions = pluginOptions.ignoreExpressions;
    const ignoreInline = pluginOptions.ignoreInline;
    const preserveInline = pluginOptions.preserveInline;
    const ignoreTagless = pluginOptions.ignoreTagless;
    const startWithNewLine = pluginOptions.startWithNewLine;
    const matchOuterIndentation = pluginOptions.matchOuterIndentation;
    const extraIndentLevel = pluginOptions.extraIndentLevel;
    return {
        TemplateLiteral(node) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            const tagName = (_e = (_b = (_a = node.parent.tag) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : (_d = (_c = node.parent.tag) === null || _c === void 0 ? void 0 : _c.object) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : (_h = (_g = (_f = node.parent.tag) === null || _f === void 0 ? void 0 : _f.callee) === null || _g === void 0 ? void 0 : _g.object) === null || _h === void 0 ? void 0 : _h.name;
            const sqlTagIsPresent = tagName === 'sql';
            if (ignoreTagless && !sqlTagIsPresent) {
                return;
            }
            if (ignoreExpressions && node.quasis.length !== 1) {
                return;
            }
            const magic = '"clap-eslint-plugin-sql"';
            const literal = node.quasis
                .map((quasi) => {
                return quasi.value.raw;
            })
                .join(magic);
            if (!sqlTagIsPresent && !(0, isSqlQuery_1.default)(literal, placeholderRule)) {
                return;
            }
            let wasInline = false;
            if (!literal.includes('\n')) {
                if (ignoreInline) {
                    return;
                }
                wasInline = true;
            }
            let formatted = (0, sql_formatter_1.format)(literal, sqlFormatterOptions);
            let isInline = false;
            if (wasInline && preserveInline) {
                // replace and compress multiple spaces in the line
                formatted = formatted.replace(/\s+/g, ' ');
                isInline = true;
            }
            // clean trailing whitespaces at the end of a line in the middle of a query
            formatted = formatted.replace(/\s+\n/g, '\n');
            if (matchOuterIndentation && !isInline) {
                const sourceCode = context.getSourceCode();
                const tagLoc = sourceCode.getLocFromIndex(node.parent.tag.range[0]);
                const tagLine = sourceCode.lines[tagLoc.line - 1];
                const spaces = tagLine.match(/^ */)[0].length;
                const padding = ' '.repeat(spaces);
                formatted = formatted.replace(/(^|\n)/g, '$1' + padding);
            }
            if (extraIndentLevel && !isInline) {
                const padding = ' '.repeat(sqlFormatterOptions.tabWidth * extraIndentLevel);
                formatted = formatted.replace(/(^|\n)/g, '$1' + padding);
            }
            if (startWithNewLine && !isInline) {
                formatted = '\n' + formatted;
            }
            else {
                formatted = formatted.trim();
            }
            if (formatted !== literal) {
                context.report({
                    fix: (fixer) => {
                        let final = formatted;
                        const expressionCount = node.expressions.length;
                        let index = 0;
                        while (index <= expressionCount - 1) {
                            try {
                                final = final.replace(magic, '${' + (0, astring_1.generate)(node.expressions[index]) + '}');
                            }
                            // some tricky to lint templates can crash astring. log a warning and skip it in this case.
                            catch (e) {
                                console.warn(`Astring failed to format template literals at node ${JSON.stringify(node)}`);
                                return;
                            }
                            index++;
                        }
                        return fixer.replaceTextRange([
                            node.quasis[0].range[0],
                            node.quasis[node.quasis.length - 1].range[1],
                        ], '`' + final + '`');
                    },
                    message: 'Format the query',
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
            description: 'Matches queries in template literals. Warns when query formatting does not match the configured format and fixes the formatting.',
            url: 'https://github.com/Clap404/eslint-plugin-sql#eslint-plugin-sql-rules-format',
        },
        fixable: 'code',
        schema: [
            {
                additionalProperties: false,
                properties: {
                    ignoreExpressions: {
                        default: false,
                        type: 'boolean',
                    },
                    preserveInline: {
                        default: true,
                        type: 'boolean',
                    },
                    ignoreInline: {
                        default: false,
                        type: 'boolean',
                    },
                    startWithNewLine: {
                        default: true,
                        type: 'boolean',
                    },
                    ignoreTagless: {
                        default: true,
                        type: 'boolean',
                    },
                    matchOuterIndentation: {
                        default: true,
                        type: 'boolean',
                    },
                    extraIndentLevel: {
                        default: 1,
                        type: 'number',
                    },
                },
                type: 'object',
            },
            {
                additionalProperties: false,
                properties: {
                    language: {
                        default: 'sql',
                        type: 'string',
                        enum: [
                            'sql',
                            'bigquery',
                            'db2',
                            'hive',
                            'mariadb',
                            'mysql',
                            'n1ql',
                            'plsql',
                            'postgresql',
                            'redshift',
                            'singlestoredb',
                            'snowflake',
                            'spark',
                            'sqlite',
                            'transactsql',
                            'tsql',
                            'trino',
                        ],
                    },
                    tabWidth: {
                        default: 2,
                        type: 'number',
                    },
                    useTabs: {
                        default: false,
                        type: 'boolean',
                    },
                    keywordCase: {
                        default: 'preserve',
                        type: 'string',
                        enum: ['preserve', 'upper', 'lower'],
                    },
                    indentStyle: {
                        default: 'standard',
                        type: 'string',
                        enum: ['standard', 'tabularLeft', 'tabularRight'],
                    },
                    logicalOperatorNewline: {
                        default: 'before',
                        type: 'string',
                        enum: ['before', 'after'],
                    },
                    tabulateAlias: {
                        default: false,
                        type: 'boolean',
                    },
                    commaPosition: {
                        default: 'after',
                        type: 'string',
                        enum: ['after', 'before', 'tabular'],
                    },
                    expressionWidth: {
                        default: 50,
                        type: 'number',
                    },
                    linesBetweenQueries: {
                        default: 1,
                        type: 'number',
                    },
                    denseOperators: {
                        default: false,
                        type: 'boolean',
                    },
                    newlineBeforeSemicolon: {
                        default: false,
                        type: 'boolean',
                    },
                },
                type: 'object',
            },
        ],
        type: 'suggestion',
    },
};
