<template>
    <div :class="$style.MatrixRainBackground">
        <canvas ref="canvas" :class="$style.canvas" />
    </div>
</template>

<script 
    lang="ts" 
    setup
>
/** Imports */
/* constants */
import {
    NUMS_MAP,
    LATIN_MAP,
    KATANA_MAP,
} from "@/assets/ts/constants/errors-constants";

const CANVAS_COLORS = {
    red: "rgba(230,230,230,1)",
    white: "rgba(255,255,255,1)",
    blackWithOpacity: "rgba(0,0,0,0.15)",
    whiteWithOpacity: "rgba(255,255,255,0.08)",
    primaryWithOpacity: "rgba(216,216,216,0.8)", 
};

const CANVAS_VALUES = {
    lineWidth: .5,
    shadowBlur: .004,
    shadowOffsetX: 2,
    shadowOffsetY: 2,
    fontSize: 16,
    randomCondition1: .975,
    randomCondition2: 1.1,
};

const canvas = ref<HTMLCanvasElement | null>(null);

function startAnimation() {
    if (!canvas.value) {
        return;
    }

    const context = canvas.value.getContext("2d");
    canvas.value.width = window.innerWidth;
    canvas.value.height = window.innerHeight;
    const nums = NUMS_MAP;
    const latin = LATIN_MAP;
    const katakana = KATANA_MAP;
    const alphabet = katakana + latin + nums;
    const fontSize = CANVAS_VALUES.fontSize;
    const columns = canvas.value.width / fontSize;
    const rainDrops: number[] = [];

    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }

    const draw = () => {
        if (!context || !canvas.value) {
            return;
        }

        const randomCondition = (val = CANVAS_VALUES.randomCondition1) => Math.random() < val;
        context.fillStyle = randomCondition(CANVAS_VALUES.randomCondition2) 
            ? CANVAS_COLORS.blackWithOpacity
            : CANVAS_COLORS.white;

        context.font = fontSize + "px monospace";
        context.fillRect(0, 0, canvas.value.width, canvas.value.height);
        context.strokeRect(0, 0, canvas.value.width, canvas.value.height);
        context.fillStyle = randomCondition()
            ? CANVAS_COLORS.primaryWithOpacity
            : CANVAS_COLORS.white;

        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            context.fillText(text, i*fontSize, rainDrops[i]*fontSize);
            if (randomCondition(0.1)) {
                context.strokeText(text, i*fontSize, rainDrops[i]*fontSize);
                context.strokeStyle = randomCondition()
                    ? CANVAS_COLORS.red
                    : CANVAS_COLORS.white;

                context.lineWidth = CANVAS_VALUES.lineWidth;
                context.shadowColor = CANVAS_COLORS.whiteWithOpacity;
                context.shadowBlur = CANVAS_VALUES.shadowBlur;
                context.shadowOffsetX = CANVAS_VALUES.shadowOffsetX;
                context.shadowOffsetY = CANVAS_VALUES.shadowOffsetY;
            }
                    
            if (rainDrops[i] * fontSize > canvas.value.height && !randomCondition()) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };

    setInterval(draw, 60);
}

onMounted(() => {
    startAnimation();
});
</script>


<style
    lang="scss"
    module
>
    .MatrixRainBackground {
        .canvas {

            /*  */
        }

        color: #16336b;
    }
</style>
