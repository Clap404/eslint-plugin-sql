declare const _default: {
    rules: {
        format: {
            create: (context: any) => {
                TemplateLiteral(node: any): void;
            };
            meta: {
                docs: {
                    description: string;
                    url: string;
                };
                fixable: string;
                schema: ({
                    additionalProperties: boolean;
                    properties: {
                        ignoreExpressions: {
                            default: boolean;
                            type: string;
                        };
                        preserveInline: {
                            default: boolean;
                            type: string;
                        };
                        ignoreInline: {
                            default: boolean;
                            type: string;
                        };
                        startWithNewLine: {
                            default: boolean;
                            type: string;
                        };
                        ignoreTagless: {
                            default: boolean;
                            type: string;
                        };
                        matchOuterIndentation: {
                            default: boolean;
                            type: string;
                        };
                        extraIndentLevel: {
                            default: number;
                            type: string;
                        };
                        language?: undefined;
                        tabWidth?: undefined;
                        useTabs?: undefined;
                        keywordCase?: undefined;
                        indentStyle?: undefined;
                        logicalOperatorNewline?: undefined;
                        tabulateAlias?: undefined;
                        commaPosition?: undefined;
                        expressionWidth?: undefined;
                        linesBetweenQueries?: undefined;
                        denseOperators?: undefined;
                        newlineBeforeSemicolon?: undefined;
                    };
                    type: string;
                } | {
                    additionalProperties: boolean;
                    properties: {
                        language: {
                            default: string;
                            type: string;
                            enum: string[];
                        };
                        tabWidth: {
                            default: number;
                            type: string;
                        };
                        useTabs: {
                            default: boolean;
                            type: string;
                        };
                        keywordCase: {
                            default: string;
                            type: string;
                            enum: string[];
                        };
                        indentStyle: {
                            default: string;
                            type: string;
                            enum: string[];
                        };
                        logicalOperatorNewline: {
                            default: string;
                            type: string;
                            enum: string[];
                        };
                        tabulateAlias: {
                            default: boolean;
                            type: string;
                        };
                        commaPosition: {
                            default: string;
                            type: string;
                            enum: string[];
                        };
                        expressionWidth: {
                            default: number;
                            type: string;
                        };
                        linesBetweenQueries: {
                            default: number;
                            type: string;
                        };
                        denseOperators: {
                            default: boolean;
                            type: string;
                        };
                        newlineBeforeSemicolon: {
                            default: boolean;
                            type: string;
                        };
                        ignoreExpressions?: undefined;
                        preserveInline?: undefined;
                        ignoreInline?: undefined;
                        startWithNewLine?: undefined;
                        ignoreTagless?: undefined;
                        matchOuterIndentation?: undefined;
                        extraIndentLevel?: undefined;
                    };
                    type: string;
                })[];
                type: string;
            };
        };
        'no-unsafe-query': {
            create: (context: any) => {
                TemplateLiteral(node: any): void;
            };
            meta: {
                docs: {
                    description: string;
                    url: string;
                };
                fixable: string;
                schema: {
                    additionalProperties: boolean;
                    properties: {
                        allowLiteral: {
                            default: boolean;
                            type: string;
                        };
                    };
                    type: string;
                }[];
                type: string;
            };
        };
    };
    rulesConfig: {
        format: number;
        'no-unsafe-query': number;
    };
};
export = _default;
