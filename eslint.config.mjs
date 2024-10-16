import unjs from "eslint-config-unjs";

export default unjs({
    ignores: [],
    rules: {
        "no-undef": 0,
        "unicorn/prefer-module": 0,
        "unicorn/prefer-top-level-await": 0,
        "unicorn/no-null": 0,
        "@typescript-eslint/no-unused-vars": 0
    },
});