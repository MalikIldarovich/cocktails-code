import { defineNuxtConfig } from "nuxt/config";
import headConfig from "./config/head/headConfig";

import fs from "fs";
import path from "path";
import upath from "upath";

const pathAssets = upath.toUnix(path.resolve(__dirname, "./assets"));

export default defineNuxtConfig({
    // @ts-expect-error TODO: чекнуть
    app: { head: headConfig },
    ssr: true,
    srcDir: ".",
    devtools: { enabled: true },

    devServer: {
        port: 3000,
        host: "0.0.0.0",
        https: process.env.HTTPS_KEY && process.env.HTTPS_CERT
            ? {
                key: fs.readFileSync(path.resolve(__dirname, process.env.HTTPS_KEY))
                    .toString(),
                cert: fs.readFileSync(path.resolve(__dirname, process.env.HTTPS_CERT))
                    .toString(),
            }
            : false,
    },

    runtimeConfig: {
        PROXY_URL: process.env.PROXY_URL,
        public: {
            DOMAIN: process.env.PROXY_URL,
            PROXY_URL: process.env.PROXY_URL,
        },
    },

    stylelint: {
        files: [
            "assets/**/*.{s?(a|c)ss}",
            "**/components/**/*.{s?(a|c)ss}",
            "**/{components,layouts,services,pages}/**/*.vue",
        ],
    },

    eslint: {
        cache: false,
        checker: true,
    },

    components: [{
        path: "@/components",
        extensions: ["vue"],
        pathPrefix: false,
    }],

    postcss: {},
    plugins: [],

    modules: [
        "@nuxt/image",
        "@nuxt/icon",
        "nuxt-icons",
        "@pinia/nuxt",
        "@nuxtjs/stylelint-module",
        "@nuxt/eslint",
    ],

    /** Setting for Pinia Module */
    pinia: {
        storesDirs: ["~/store/**"],
    },

    /** Setting for NuxtImage Module */
    image: {
        domains: ["https://www.thecocktaildb.com"],
    },

    /** Setting for NuxtImage Module */
    swiper: {
        prefix: "Swiper",
        styleLang: "css",
        modules: ["navigation", "pagination", "controller", "autoplay"],
    },

    /** CSS Common & Shared Layers */
    css: [
        "~/assets/css/bundle.scss",
        "~/assets/css/main.scss",
    ],

    /** Setting for Vite */
    vite: {
        vue: {
            script: {
                propsDestructure: true,
            },
        },

        server: {
            hmr: {
                clientPort: 3000,
            },
        },

        // optimizeDeps: {
        //     exclude: ["fsevents"],
        //     include: ["vue-docgen-api"],
        // },

        /** Additional SCSS Files */
        css: {
            preprocessorOptions: {
                api: "modern-compiler",
                scss: {
                    additionalData: `
                    @use "${pathAssets}/css/shared/variables" as *;
                    @use "${pathAssets}/css/shared/mixins" as *;
                    @use "${pathAssets}/css/shared/functions" as *;
                    @use "${pathAssets}/css/shared/themes" as *;
                    `,
                },
                silenceDeprecations: ["legacy-js-api", "mixed-decls", "global-builtin", "color-functions", "import"],
            },
        },

        /** Setting Build */
        build: {
            cssCodeSplit: true,
            cssMinify: "esbuild",
            rollupOptions: {
                output: {
                    experimentalMinChunkSize: 250 * 1024,
                    manualChunks: (id, _) => {
                        if (
                            !id.includes("node_modules") &&
                            !id.startsWith("virtual:") &&
                            !id.includes("src") &&
                            !id.includes("assets")
                        ) {
                            if (id.includes("pages")) {
                                const parts = id.split("/");
                                const folderIndex = parts.indexOf("pages");
                                if (folderIndex + 2 < parts.length) {
                                    const pageGroup = parts[folderIndex + 1];
                                    return `chunk-pg-${pageGroup}`;
                                }
                                return "chunk-pg-misc";
                            }
                        }
                    },
                },
            },
        },
    },

    compatibilityDate: "2025-03-17",
});
