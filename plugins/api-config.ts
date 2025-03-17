import { type NuxtApp, defineNuxtPlugin } from "nuxt/app";
import apiConfig from "../config/api/apiConfig";

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
    nuxtApp.provide("api", apiConfig);
});
