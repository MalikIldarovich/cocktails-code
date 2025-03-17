<script 
    setup
    lang="ts"
>

/** Imports **/
/* vue & nuxt */
import { useError } from "nuxt/app";

/* pinia*/
import { useThemeStore } from "@/store/theme";

/* constants */
import {
    type TErrorCode,
    ERROR_IMAGES,
    ERROR_TITLES,
    ERROR_DESCRIPTIONS,
} from "@/assets/ts/constants/errors-constants";

/* componentns */
import { Icon } from "@iconify/vue";
import Heading from "@/components/ui/heading/Heading";
import MatrixRainBackground from "@/components/common/backgrounds/MatrixRainBackground";

/** Nuxt App **/
const error = useError();
const themeStore = useThemeStore();

/** Data **/
const { theme } = toRefs(themeStore);

/** Computed **/
const statusCode = computed(() => error.value?.statusCode || 500);
const image = computed(() => ERROR_IMAGES[statusCode.value as TErrorCode]);
const title = computed(() => ERROR_TITLES[statusCode.value as TErrorCode]);
const description = computed(() => ERROR_DESCRIPTIONS[statusCode.value as TErrorCode]);
</script>

<template>
    <div :class="[$style.ErrorPage, 'app', `theme-${theme}`]">
        <NuxtLayout
            name="default"
        >
            <div :class="[$style.wrapper, 'spaces-box']">
                <MatrixRainBackground
                    :class="$style['error-bg']"
                />

                <div :class="[$style.content, 'container']">
                    <div :class="$style['image-wrapper']">
                        <NuxtImg 
                            format="webp"
                            alt="Example"
                            loading="lazy"
                            :src="image"
                            :class="$style.image"
                        />
                    </div>

                    <Heading
                        tag="h1"
                        icon="tdesign:error-triangle"
                        size="xxl"
                        color="primary"
                        :title="title"
                        :class="$style.title"
                    />

                    <p
                        :class="$style.description"
                        v-html="description"
                    />

                    <NuxtLink
                        to="/"
                        :class="[$style.link, 'flex-row-center']"
                    >
                        <span
                            :class="$style.label"
                            v-html="'На главную'"
                        />

                        <Icon
                            ssr
                            icon="famicons:return-up-back-sharp"
                            width="24"
                            height="24"
                            :class="$style.icon"
                        />
                    </NuxtLink>
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>

<style 
    lang="scss"
    module
>
    .ErrorPage {
        .error-bg {
            position: fixed;
            inset: 0 0 0 0;
            z-index: 1;
        }

        .wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
        }

        .content {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            max-width: 102.4rem;
            padding: 2.4rem 1.6rem 4rem;
            border-radius: 1.2rem;
            border: 2px solid #fff;
            background-color: rgba(#1b1b1b, .1);
            backdrop-filter: blur(.4rem);
        }

        .image-wrapper {
            width: 52rem;
            height: 35rem;
            border-radius: $r-md;
            
            .image {
                width: 100%;
                height: 100%;
                object-fit: contain;
                border-radius: $r-sm;
                transition: transform .3s ease-in-out;
            }

            @include hover {
                .image {
                    transform: scale(1.1);
                }
            }
        }

        .title,
        .description {
            text-align: center;
        }

        .description {
            @include text(p1-semibold);

            margin-top: 2.4rem;
            color: #fff;
        }

        .link {
            gap: .8rem;
            margin-top: 2.4rem;
            padding: 1.2rem 2.4rem;
            border-radius: 1.2rem;
            background-color: #c9d2eb;
            box-shadow: 0 0 8px 2px rgba(#2e4f91, .4);
            color: #fff;
            transition: 
                background-color .3s ease-in-out,
                color .3s ease-in-out,
                box-shadow .3s ease-in-out;

            .label {
                @include text(l3-semibold);
            }

            @include hover {
                background-color: #38815b;
                box-shadow: 0 0 4px 2px rgba(#4caf50, 0.2);
            }
        }

        @include respond-to(xxs) {
            .image-wrapper {
                width: 32rem;
                height: 25rem;
            }

            .title {
                h1[class*="title"] {
                    @include text(h5);

                    flex-direction: column;
                }
            }

            .description {
                @include text(p3);
            }
        }
    }
</style>
