import { defineStore } from "pinia";
import type { TTheme } from "@/components/ui/types";

export const useThemeStore = defineStore("themeStore", () => {
    const theme = ref<TTheme>("dark");

    function changeTheme(value: TTheme) {
        theme.value = value;
    }

    return {
        theme,
        changeTheme,
    };
});
