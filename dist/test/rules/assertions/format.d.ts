declare const _default: {
    invalid: ({
        code: string;
        errors: {
            message: string;
        }[];
        options: ({
            ignoreInline: boolean;
            ignoreTagless: boolean;
            spaces?: undefined;
        } | {
            spaces: number;
            ignoreInline?: undefined;
            ignoreTagless?: undefined;
        })[];
        output: string;
    } | {
        code: string;
        errors: {
            message: string;
        }[];
        options: {
            ignoreInline: boolean;
        }[];
        output: string;
    })[];
    valid: ({
        code: string;
        options: {
            ignoreInline: boolean;
        }[];
    } | {
        code: string;
        options: {
            ignoreTagless: boolean;
        }[];
    } | {
        code: string;
        options: {
            ignoreExpressions: boolean;
            ignoreInline: boolean;
            ignoreTagless: boolean;
        }[];
    })[];
};
export default _default;
