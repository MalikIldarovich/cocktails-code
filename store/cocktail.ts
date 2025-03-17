import { defineStore } from "pinia";
import type { TCocktailScheme } from "@/interfaces/schemes";

export const useCocktailStore = defineStore("cocktailStore", () => {
    const cocktails = ref<Record<string, TCocktailScheme[]> | null>(null);

    function setCocktailsList(list: TCocktailScheme[], slug: string) {
        if (!cocktails.value) {
            cocktails.value = { [slug]: list };
        } else {
            cocktails.value = {
                ...cocktails.value,
                [slug]: list,
            };
        }
    }

    return {
        cocktails,
        setCocktailsList,
    };
});
