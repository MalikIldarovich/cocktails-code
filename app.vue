<template>
    <div :class="['app', `theme-${theme}`]">
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
/** Imports **/
/* pinia*/
import { useThemeStore } from "@/store/theme";

/** Data **/
const themeStore = useThemeStore();
const { theme } = storeToRefs(themeStore);
</script>

<style lang="scss">
    .theme-dark {
        width: 100%;
    }

    .theme-light {
        width: 100%;
    }
</style>
