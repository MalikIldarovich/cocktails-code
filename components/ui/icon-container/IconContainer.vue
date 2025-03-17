<template>
    <div
        :class="[
            $style.IconContainer,
            [!loaded ? 'skeleton-mask' : '']
        ]"
        @mouseenter="onHover(true)"
        @mouseleave="onHover(false)"
        @click="onClick"
    >
        <slot></slot>
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
    onMounted,
    defineEmits,
} from "vue";

/** Data **/
const loaded = ref(false);
    
/** Emits **/
const emits = defineEmits<{
    hover: [boolean];
    click: [];
}>();

/** Methods **/
const onHover = (val: boolean) => {
    emits("hover", Boolean(val));
};

const onClick = () => {
    emits("click");
};

onMounted(() => {
    loaded.value = true;
});
</script>


<style
    lang="scss"
    module
>
    .IconContainer {

        /** */
    }
</style>
