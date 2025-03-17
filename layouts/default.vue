<template>
    <div 
        :class="[
            $style.DefaultLayout,
            $style[theme],
            'layout',
            'flex-column',
            `theme-${theme}`,
        ]"
    >    
        <!-- Loading Indicator -->
        <NuxtLoadingIndicator />

        <div :class="$style.background" />

        <!-- Header -->
        <Header :class="$style.header" />

        <!-- Container -->
        <div :class="[$style.wrapper, 'container']">

            <!-- Navigation -->
            <Navigation
                :list="navs"
                :class="$style.navigation"
            />

            <!-- Main | Nuxt Page -->
            <main :class="$style.main">
                <slot />
            </main>
        </div>

        <!-- Footer -->
        <Footer :class="$style.footer"/>
    </div>
</template>

<script 
    setup 
    lang="ts"
>
/** Imports **/
import { 
    useNuxtApp,
} from "nuxt/app";

/* vue*/
import {
    ref,
    toRefs,
} from "vue";

/* pinia*/
import { useThemeStore } from "@/store/theme";

/* mock */
import { NAVIGATION_LIST } from "@/assets/ts/constants/layout-constants";

/* components */
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import Navigation from "@/components/layout/navigation/Navigation";

/** Nuxt App **/
const nuxtApp = useNuxtApp();
const themeStore = useThemeStore();
const { theme } = toRefs(themeStore);

/** Data **/
const loading = ref(true);
const navs = reactive(NAVIGATION_LIST);

/** App Hooks **/
nuxtApp.hook("page:loading:start", () => {
    loading.value = true;
});

nuxtApp.hook("page:loading:end", () => {
    loading.value = false;
});
</script>


<style
    lang="scss"
    module
>
    .DefaultLayout {
        min-height: 100vh;

        &.dark {
            .background {
                background-image: url("/images/backgrounds/dark_abstract_1.jpg");
            }
        }

        &.light {
            .background {
                background-image: url("/images/backgrounds/light_abstract_1.jpg");
            }
        }

        .background {
            position: fixed;
            inset: 0 0 0 0;
            z-index: 0;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            transition: $default-transition, background .3s ease-in-out;
        }

        .header {
            position: sticky;
            top: 0;
            z-index: 10;
        }

        .navigation {
            position: fixed;
            top: $header-height;
            z-index: 9;
            height: 100%;
        }

        .wrapper {
            position: relative;
            z-index: 2;
            display: flex;

            @include themify($themes) {
                color: themed(cl-main);
            }
        }

        .main {
            width: 100%;
            min-height: 100vh;
            padding-left: 6.4rem;
        }

        .footer {
            z-index: 20;
            justify-self: flex-end;
        }

        .loader-icon {
            @include themify($themes) {
                color: themed(cl-main);
            }
        }

        @include respond-to(xxs) {
            .main {
                padding-left: 2.4rem;
            }
        }
    }
</style>
