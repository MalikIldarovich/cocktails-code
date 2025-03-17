<template>
    <div :class="$style.Footer">
        <div class="container flex-row-center">
            <div :class="$style.left">
                <div>LOGO</div>
            </div>

            <div :class="$style.right"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
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
        }
    }
</style>
