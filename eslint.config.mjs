import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";

const browserGlobals = {
    Blob: "readonly",
    ClipboardEvent: "readonly",
    Event: "readonly",
    File: "readonly",
    FileReader: "readonly",
    FormData: "readonly",
    HTMLInputElement: "readonly",
    HTMLElement: "readonly",
    HTMLSelectElement: "readonly",
    HTMLTextAreaElement: "readonly",
    Image: "readonly",
    InputEvent: "readonly",
    KeyboardEvent: "readonly",
    MouseEvent: "readonly",
    Node: "readonly",
    URL: "readonly",
    clearInterval: "readonly",
    clearTimeout: "readonly",
    console: "readonly",
    document: "readonly",
    fetch: "readonly",
    localStorage: "readonly",
    setInterval: "readonly",
    setTimeout: "readonly",
    window: "readonly"
};

const nodeGlobals = {
    __APP_VERSION__: "readonly",
    module: "readonly",
    process: "readonly",
    require: "readonly"
};

export default [
    {
        linterOptions: {
            reportUnusedDisableDirectives: "off"
        },
        ignores: [
            "dist/**",
            "node_modules/**",
            "package-lock.json",
            "public/assets/css/output.css",
            "src/types/shims-vue.d.ts"
        ]
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs["flat/essential"],
    {
        files: ["**/*.vue"],
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser,
                extraFileExtensions: [".vue"],
                ecmaVersion: "latest",
                sourceType: "module"
            }
        }
    },
    {
        files: ["**/*.{ts,vue,js,cjs,mjs}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...browserGlobals,
                ...nodeGlobals
            }
        },
        rules: {
            "@typescript-eslint/ban-ts-comment": "off",
            "@typescript-eslint/no-empty-object-type": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unsafe-function-type": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "no-empty": "off",
            "no-useless-catch": "off",
            "no-useless-escape": "off",
            "prefer-const": "off",
            "preserve-caught-error": "off",
            "vue/multi-word-component-names": "off",
            "vue/no-use-v-if-with-v-for": "off",
            "vue/valid-v-for": "off"
        }
    }
];
