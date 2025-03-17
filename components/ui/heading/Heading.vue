<template>
    <div :class="[$style.Heading]">
        <component
            :is="tag"
            :class="[
                $style.title,
                $style[size],    
                $style[color],
                $style[weight],
                ellipsis ? $style.ellipsis : '',
                uppercase ? $style.uppercase : '',
                textShadow ? $style['text-shadow'] : '',
                classes,
            ]"
            @click="onClick"
        >
            <Icon
                v-if="icon"
                ssr
                :icon="icon"
                :class="$style.icon"
            />

            <span
                v-html="title"
            />
            <slot name="default"></slot>
        </component>
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
    defineEmits,
    defineProps,
    withDefaults,
} from "vue";

/* types */
import type { IHeadingProps } from "@/components/ui/heading/types";
    
/* components */
import { Icon } from "@iconify/vue";

/** Props **/
const props = withDefaults(defineProps<IHeadingProps>(), {
    tag: "h3",
    size: "lg",
    color: "default",
    weight: "semibold",
    icon: "",
    title: "",
    classes: "",
    ellipsis: false,
    uppercase: false,
    textShadow: true,
});

const {
    tag,
    size,
    color,
    weight,
    icon,
    title,
    classes,
    uppercase,
} = toRefs(props);

/** Emits **/
const emits = defineEmits(["click"]);

/** Handlers **/
const onClick = () => {
    emits("click");
};
</script>


<style
    lang="scss"
    module
>
    .Heading {
        position: relative;
        font-family: $base-font;
        user-select: none;

        &.skeleton-mask {
            @include themify($themes) {
                background-color: themed(bg-skeleton);
            }

            .title {
                opacity: 0;
            }
        }

        .title {
            display: flex;
            align-items: center;
            gap: .6rem;
            opacity: 1;
            line-height: 1.2;

            &.uppercase {
                text-transform: uppercase;
            }

            &.normal {
                font-weight: 400;
            }

            &.medium {
                font-weight: 500;
            }

            &.semibold {
                font-weight: 600;
            }

            &.bold {
                font-weight: 700;
            }

            &.xxs {
                @include text(h6);
            }

            &.xs {
                @include text(h6);

                .icon {
                    width: 1.8rem;
                    height:1.8rem;
                }
            }

            &.sm {
                @include text(h5);

                .icon {
                    width: 2rem;
                    height:2rem;
                }
            }

            &.md {
                @include text(h4);

                .icon {
                    width: 2.4rem;
                    height:2.4rem;
                }
            }

            &.lg {
                @include text(h3);

                .icon {
                    width: 3.2rem;
                    height: 3.2rem;
                }
            }

            &.xl {
                @include text(h2);

                .icon {
                    width: 4rem;
                    height: 4rem;
                }
            }

            &.xxl {
                @include text(h1);

                .icon {
                    width: 4.8rem;
                    height: 4.8rem;
                }
            }

            @include themify($themes) {
                &.default {
                    color: themed(cl-main);
                }

                &.soft {
                    color: themed(cl-soft);
                }

                &.primary {
                    color: themed(primary);
                }

                &.secondary {
                    color: themed(secondary);
                }

                &.error {
                    color: themed(error);
                }

                &.warning {
                    color: themed(warning);
                }

                &.success {
                    color: themed(success);
                }

                &.inherit {
                    color: inherit;
                }

                &.text-shadow {
                    text-shadow: 1px 1px 2px rgba(themed(cl-main), .2);
                }
            }

            &.dark {
                color: $dark;
            }

            &.light {
                color: $light;
            }

            &.ellipsis {
                @include ellipsis(2rem, 1);
            }
        }
    }
</style>
