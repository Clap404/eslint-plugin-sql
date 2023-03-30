declare const _default: {
    invalid: ({
        code: string;
        errors: {
            message: string;
        }[];
        settings?: undefined;
    } | {
        code: string;
        errors: {
            message: string;
        }[];
        settings: {
            sql: {
                placeholderRule: string;
            };
        };
    })[];
    valid: ({
        code: string;
        options: {
            allowLiteral: boolean;
        }[];
    } | {
        code: string;
        options?: undefined;
    })[];
};
export default _default;
