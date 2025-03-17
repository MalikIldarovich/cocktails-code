import { faviconsMeta, faviconsLinks } from "./favicon";

const headConfig = {
    htmlAttrs: { lang: "ru" },
    title: "Cocktails Code",
    meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
        ...faviconsMeta,
    ],

    link: [
        ...faviconsLinks || {},
    ],

    script: [],
    noscript: [],
    __dangerouslyDisableSanitizers: ["script", "noscript"],
};


export default headConfig;
