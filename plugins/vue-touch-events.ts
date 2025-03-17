import { type NuxtApp, defineNuxtPlugin } from "nuxt/app";
import Vue3TouchEvents from "vue3-touch-events";

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
    nuxtApp.vueApp.use<unknown[]>(Vue3TouchEvents);
});
