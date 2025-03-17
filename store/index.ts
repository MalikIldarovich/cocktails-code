import { defineStore } from "pinia";

export const useMainStore = defineStore("main", () => {
    async function nuxtServerInit() {
        try {
            /** Place for load something data **/
        } catch (e) {
            console.error("[nuxtServerInit]: ", e);
        }
    }

    return {
        nuxtServerInit,
    };
});
