<template>
    <div
        :class="[
            $style.Switch,
            $style[color],
            $style[size],
            $style[lazyValue ? 'is-active' : ''],
            $style[disabled ? 'is-disabled' : ''],
            $style[reverse ? 'is-reverse' : ''],
            $style[isFocused ? 'is-focused' : ''],
        ]"
        role="switch"
        :aria-checked="Boolean(lazyValue)"
        :aria-disabled="disabled"
    >
        <span
            v-if="$slots.falseLabel"
            :class="[$style.label, $style.left, {[$style.blur]: lazyValue}]"
            @click="onLabelClick(false)"
        >
            <slot name="falseLabel"></slot>
        </span>

        <div
            :class="$style.field"
            tabindex="0"
            @focus="onFocus"
            @blur="onBlur"
            @click="onChange"
            @keydown.enter="onChange"
        >
            <transition name="fade">
                <div
                    v-if="!icon"
                    :class="$style.dot"    
                />
                
                <div v-else>
                    <Icon :name="icon" :class="$style.dot" />
                </div>
            </transition>
        </div>

        <span
            v-if="$slots.trueLabel"
            :class="[$style.label, $style.right, {[$style.blur]: !lazyValue}]"
            @click="onLabelClick(true)"
        >
            <slot name="trueLabel"></slot>
        </span>

        <input
            v-if="name"
            type="hidden"
            :name="name"
            :value="lazyValue ? trueValue : falseValue"
        >
    </div>
</template>


<script 
    setup 
    lang="ts"
>
/** Imports **/
/* vue */
import {
    ref,
    watch,
    computed,
    onMounted,
    defineProps,
    defineEmits,
    withDefaults,
} from "vue";

/* types */
import type { ISwitchProps } from "@/components/ui/switch/types";


/** Props **/
const props = withDefaults(defineProps<ISwitchProps>(), {
    name: "",
    icon: "",
    size: "md",
    color: "default",
    value: undefined,
    reverse: false,
    disabled: false,
    trueValue: true,
    falseValue: false,
    changeActiveLabel: false,
});

const { 
    name,
    value,
    trueValue,
    falseValue,
    disabled,
    reverse,
    changeActiveLabel,
    size,
    color,
} = toRefs(props);


/** Data **/
const lazyValue = ref<string | boolean | number | undefined>(false); const 
    isFocused = ref(false);


/** Emits **/
const emits = defineEmits(["input", "change"]);


/** Computed **/
const singleLabel = computed(() => false);


/** Handlers **/
const onFocus = () => {
    isFocused.value = true;
};

function onBlur() {
    isFocused.value = false;
}

function onLabelClick(val: string | boolean | number | undefined) {
    if (disabled.value || lazyValue.value === val && !singleLabel.value) {
        return;
    }

    if (singleLabel.value) {
        return onChange();
    }

    if (value.value !== undefined) {
        emits("input", val ? trueValue.value : falseValue.value);
    } else {
        lazyValue.value = val;
        emits("change", lazyValue.value);
    }
}

function onChange() {
    if (disabled.value) {
        return;
    }

    if (value.value !== undefined) {
        emits("input", lazyValue.value ? falseValue.value : trueValue.value);
    } else {
        lazyValue.value = !lazyValue.value;
        emits("change", lazyValue.value);
    }
}

type TWathValue = string | number | boolean | undefined;

/** Watchers **/
watch(value, (val: TWathValue) => {
    const newVal = val;
    if (newVal === trueValue.value && lazyValue.value !== true) {
        lazyValue.value = true;
        emits("change", newVal);
    } else if (lazyValue.value !== false) {
        lazyValue.value = false;
        emits("change", newVal);
    }
});

watch(changeActiveLabel, (val: TWathValue) => {
    lazyValue.value = val;
});


/** LifeCycles Hooks **/
lazyValue.value = Boolean(value.value);

onMounted(() => {
    console.log("CLASSLIST");
});
</script>

<style
    lang="scss"
    module
>
    .Switch {
        $sm-dot-size: 1.2rem;
        $md-dot-size: 2rem;
        $lg-dot-size: 3.6rem;

        display: inline-flex;
        align-items: center;
        -webkit-user-select: none;
        user-select: none;
        outline: none;
        transition: $default-transition;
        cursor: pointer;
        
        &.is-reverse {
            flex-direction: row-reverse;
        }

        &.is-single {
            .field {
                margin-left: 0;
            }
        }

        &.is-disabled {
            pointer-events: none;
            opacity: .5;
            cursor: default;
        }

        &.default {
            @include themify($themes) {
                .field {
                    border: $border-size-md solid themed(cl-soft);
                }

                @include hover {
                    .field  > .dot {
                        color: themed(primary);
                        transition: $theme-transition;
                    }

                    .field {
                        border: $border-size-md solid themed(primary);
                        box-shadow: themed(primary-shadow);
                    }
                }
            }
        }

        &.primary {
            @include themify($themes) {
                &.is-active {
                    .field {
                        background-color: themed(primary);
                    }
                }
            }
        }

        &.lg {
            font-size: 1.6rem;

            .field {
                width: 6.4rem;
                height: 3.2rem;
                margin: 0 $s-sm;
            }

            .dot {
                width: $lg-dot-size;
                height: $lg-dot-size;
            }

            &.is-active {
                .dot {
                    left: calc(100% - #{$lg-dot-size} - 4px);
                }
            }
        }

        &.md {
            font-size: 1.2rem;

            .field {
                width: 4.8rem;
                height: 2.4rem;
                margin: 0 $s-xs;
            }

            .dot {
                width: $md-dot-size;
                height: $md-dot-size;
            }

            &.is-active {
                .dot {
                    left: calc(100% - #{$md-dot-size} - 4px);
                }
            }
        }

        &.sm {
            font-size: 1rem;

            .field {
                width: 3.2rem;
                height: 1.6rem;
                margin: 0 $s-xxs;
            }

            .dot {
                width: $sm-dot-size;
                height: $sm-dot-size;
            }

            &.is-active {
                .dot {
                    left: calc(100% - #{$sm-dot-size} - 4px);
                }
            }
        }

        .label {
            transition: $default-transition;
        }

        .field {
            position: relative;
            display: block;
            border-radius: 100rem;
            outline: none;
            transition: $theme-transition;
            cursor: pointer;
        }

        .dot {
            position: absolute;
            top: 51%;
            left: 4px;
            border-radius: 50%;
            transform: translate3d(0, -50%, 0);
            transition:
                left .3s ease,
                background-color .3s ease-in-out;
            will-change: left;
        }

        @include themify($themes) {
            .field {
                background-color: themed(bg-soft);
                color: themed(primary);
            }
            
            .dot {
                background-color: themed(primary);
            }

            .label {
                &.blur {
                    color: themed(cl-main);
                }
            }
        }
    }
</style>
