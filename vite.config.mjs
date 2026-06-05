import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const uiToolkitPath = fileURLToPath(new URL("../../fi-ui-toolkit/src", import.meta.url));

export default defineConfig({
    root: "./",
    base: "/",
    mode: "development",

    define: { __APP_VERSION__: JSON.stringify("v1.0.0") },

    plugins: [vue(), tailwindcss()],

    publicDir: "./public/",

    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "@ui": uiToolkitPath,
            vue: path.resolve(__dirname, "node_modules/vue")
        }
    },

    appType: "spa",

    build: {
        outDir: "./dist",
        rollupOptions: { input: "./index.html" }
    },

    optimizeDeps: {
        include: ["axios", "vue", "vue-router"],
        exclude: ["@ui"]
    },

    server: {
        fs: {
            allow: [__dirname, uiToolkitPath]
        },

        port: 5172,
        strictPort: true,
        open: true,
        historyApiFallback: true
    }
});
