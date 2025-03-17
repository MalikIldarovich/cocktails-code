<template>
    <article
        :class="[
            $style.ArticleContainer,
            {[$style.underline]: underline},
            'themed-section-main',
        ]"
    >
        <!-- Top | Heading -->
        <div
            v-if="$slots.top"
            :class="[
                $style.top,
                'spaces-box',
                'flex-row-center',
            ]"
        >
            <slot name="top" />
        </div>

        <!-- Middle | Content -->
        <div :class="[$style.middle]">
            <slot name="middle" />
        </div>

        <!-- Bottom | Actions -->
        <div 
            v-if="$slots.bottom"
            :class="[
                $style.bottom,
                'spaces-box',
                'flex-row-center',
            ]"
        >
            <slot name="bottom" />
        </div>
    </article>
</template>


<script 
    setup 
    lang="ts"
>
/** Imports **/
/* vue */
import {
    toRefs,
    defineProps,
    withDefaults,
} from "vue";

/* types */
import type { IArticleContainerProps } from "@/components/common/articles/types";

/** Props **/
const props = withDefaults(defineProps<IArticleContainerProps>(), {
    underline: false,
});

const { underline } = toRefs(props);
</script>


<style
    lang="scss"
    module
>
    .ArticleContainer {
        position: relative;
        overflow: hidden;
        border-radius: $r-sm;

        &.underline {
            &:after {
                content: "";
                position: absolute;
                bottom: -.2rem;
                left: 50%;
                width: 90%;
                height: .2rem;
                border-radius: $r-xxs;
                transform: translate(-50%);
            }
        }

        .top,
        .bottom {
            display: flex;
        }

        .middle {
            overflow: auto;
        }

        @include themify($themes) {
            border: $border-size-md solid themed(box-border-color);

            &.underline {    
                &:after {
                    background-color: themed(primary);
                }
            }

            .top {
                border-bottom: $border-size-md solid themed(box-border-color);
            }

            .bottom {
                border-top: $border-size-md solid themed(box-border-color);
            }
        }

        @include respond-to(xxs) {
            border-radius: 1.2rem;
        }
    }
</style>
