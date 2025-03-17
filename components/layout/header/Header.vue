<template>
    <div :class="[$style.Header]">
        <div class="container flex-row-center-between">
            <div :class="[$style.left, 'flex-row-center']">
                <NuxtLink to="/" :class="$style.logo">
                    <NuxtImg 
                        format="webp"
                        alt="Example"
                        loading="lazy"
                        src="/images/logo.svg"
                        :class="$style.image"
                    />
                </NuxtLink>
            </div>

            <div :class="[$style.right, 'flex-row-center']">
                <Switch
                    reverse
                    :icon="themeIcon"
                    :value="themeValue"
                    :change-active-label="false"
                    @input="onChangeTheme"
                    @change="onChangeTheme"
                />
            </div>
        </div>
    </div>
</template>

<script 
    setup
    lang="ts"
>
/** Imports **/
/* vue */
import {
    toRefs,
    computed,
} from "vue";

/* pinia*/
import { useThemeStore } from "@/store/theme";

/* components */
import Switch from "@/components/ui/switch/Switch";
    
/** Data **/
const themeStore = useThemeStore();
const { theme } = toRefs(themeStore);

/** Computed **/
const themeIcon = computed(() => theme.value === "light" ? "clarity:moon-solid" : "tabler:sun-filled");
const themeValue = computed(() => theme.value === "light");

/** Handlers **/
const onChangeTheme = (val: boolean) => {
    themeStore.changeTheme(val ? "light" : "dark");
};
</script>


<style
    lang="scss"
    module
>
    .Header {
        padding: $s-xs $s-md;

        @include themify($themes) {
            border-bottom: 1px solid themed(box-border-color);
            background-color: themed(bg-header);
            color: themed(cl-soft);
            box-shadow: $default-shadow-sm;
            transition: $theme-transition;

            .image {
                color: themed(primary);
            }

            .logo {
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 1.2rem;
                transition: background-color .3s ease-in-out;

                @include hover {
                    background-color: themed(bg-soft);
                }
            }
        }

        .image {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        .icon {
            width: 2.4rem;
            height: 2.4rem;
            cursor: pointer;

            @include themify($themes) {
                color: themed(base600);
                transition: $theme-transition;

                @include hover {
                    color: themed(primary);
                }
            }
        }

        .right {
            gap: 3.2rem;
        }

        .logo {
            width: 8.4rem;
            height: 8.4rem;
        }

        .dropdown {
            display: flex;
            align-items: center;
            width: 40rem;
            padding: $s-md;

            @include themify($themes) {
                background-color: themed(bg-main);
            }
        }
    }
</style>
