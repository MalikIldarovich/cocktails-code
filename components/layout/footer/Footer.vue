<template>
    <div :class="$style.Footer">
        <div :class="[$style.wrapper, 'container']">
            <div 
                v-if="socials?.length"
                :class="$style.socials"
            >
                <NuxtLink 
                    v-for="social in socials"
                    :key="social.to"
                    target="_blank"
                    :to="social.to"
                    :class="$style.link"
                >
                    <Icon
                        width="32"
                        height="32"
                        :icon="social.icon"
                        :class="$style.icon"
                    />
                </NuxtLink>
            </div>

            <p 
                v-if="copy"
                :class="$style.copy"
                v-html="copy"
            />
        </div>
    </div>
</template>

<script 
    setup
    lang="ts"
>
/** Imports */
/* vue */
import {
    defineProps,
    withDefaults,
} from "vue";

/* constants */
import {
    type ISocialItem,
    SOCIALS_LIST,
} from "@/assets/ts/constants/layout-constants";

/* componentns */
import { Icon } from "@iconify/vue";


/** Props */
const props = withDefaults(defineProps<{
    socials?: ISocialItem[];
    copy?: string;
}>(), {
    socials: () => SOCIALS_LIST,
    copy: "@Malik WebDev 2025",
});

const { socials, copy } = props;
</script>

<style
    lang="scss"
    module
>
    .Footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: $s-md;

        @include themify($themes) {
            background-color: themed(bg-main);
            color: themed(cl-soft);
            box-shadow: themed(header-shadow);
            transition: $theme-transition;

            .link {
                width: 3.2rem;
                height: 3.2rem;
                border-radius: 50%;
                transition: 
                    color .3s ease-in-out,
                    box-shadow .3s ease-in-out;

                @include hover {
                    color: themed(primary);
                    box-shadow: 
                        themed(primary-shadow),
                        themed(primary-shadow),
                        themed(primary-shadow);
                }
            }
        }

        .wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
        }

        .socials {
            display: flex;
            align-items: center;
            gap: 2.4rem;
            margin-bottom: 2.4rem;
        }

        .copy {
            @include text(p3-semibold);
        }
    }
</style>
