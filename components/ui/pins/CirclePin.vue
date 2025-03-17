<template>
    <div
        :class="[
            $style.CirclePin,
            animate,
            $style[color || ''],
            $style[size || ''],
            'flex-row-center-center',
        ]"
    />
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
import type { ICirclePinProps } from "@/components/ui/pins/types";


/** Props **/ 
const props = withDefaults(defineProps<ICirclePinProps>(), {
    size: "sm",
    color: "success",
    animate: "pulse",
});

const { 
    size,
    color, 
    animate,
} = toRefs(props);
</script>


<style
    lang="scss"
    module
>
    .CirclePin {
        padding: .1rem;
        border-radius: 50%;

        @include themify($themes) {
            &.error {
                background-color: themed(error-alt);
                box-shadow: themed(error-shadow); 
                transition: $theme-transition;
            }

            &.warning {
                background-color: themed(warning-alt);
                box-shadow: themed(warning-shadow); 
                transition: $theme-transition;
            }

            &.success {
                background-color: themed(success-alt);
                box-shadow: themed(success-shadow);
                transition: $theme-transition;
            }
        }

        &.sm {
            width: .6rem;
            height: .6rem;
        }

        &.md {
            width: .8rem;
            height: .8rem;
        }

        &.lg {
            width: 1rem;
            height: 1rem;
        }

        &.xl {
            width: 1.2rem;
            height: 1.2rem;
        }
    }
</style>
