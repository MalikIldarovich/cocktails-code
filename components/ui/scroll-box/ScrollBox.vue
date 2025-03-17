<template>
    <div
        ref="box"
        :class="[
            $style.ScrollBox,
            $style[`--${props.railColor}`],
            {
                [$style['is-top']]: isTop,
                [$style['is-bottom']]: isBottom,    
                [$style['is-absolute']]: props.isAbsolute,
                [$style['is-skip-offset']]: props.skipOffset,
                [$style['fade-box']]: applyFadeBox,
            } 
        ]"
        :style="styles"
    >
        <div
            ref="placeholder"
            :class="$style.placeholder"
        />
    
        <div
            ref="wrapper"
            :class="$style.wrapper"
            @scroll="onScroll"
        >
            <div
                ref="content"
                :class="[$style.content, contentClass]"
            >
                <slot></slot>
            </div>
        </div>

        <div
            v-if="isYOverflowing && !hideScrollbar"
            ref="yRail"
            :class="[
                $style.scrollbar,
                $style.vertical,
                $style[yRailPosition]
            ]"
            @mousedown="(e) => onRailClick(e, 'y')"
        >
            <div
                ref="yThumb"
                :class="[$style.thumb, {[$style['is-scrolling']]: isScrolling}]"
                :style="{ height: `${dimensions.yThumbHeight}px`, transform: yScrollPosition }"
                @mousedown="(e) => onThumbClick(e, 'y')"
            />
        </div>
  
        <div
            v-if="isXOverflowing && !hideScrollbar"
            ref="xRail"
            :class="[$style.scrollbar, $style.horizontal]"
            @mousedown="(e) => onRailClick(e, 'x')"
        >
            <div
                ref="xThumb"
                :class="[$style.thumb, {[$style['is-scrolling']]: isScrolling}]"
                :style="{ width: `${dimensions.xThumbWidth}px`, transform: xScrollPosition }"
                @mousedown="(e) => onThumbClick(e, 'x')"
            />
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
    ref,
    watch,
    computed,
    nextTick,
    defineProps,
    defineEmits,
    onMounted,
    onBeforeUnmount,
} from "vue";

/* types */
import type { IAxisData } from "@/components/ui/scroll-box/types";

/* utils */
import { getFontSize } from "@/assets/ts/utils/convertation-utils";
import { addResizeListener, removeResizeListener } from "@/assets/ts/utils/scroll-utils";

/** Props **/
const props = defineProps({
    styles: { type: Object, default: () => ({}) },
    scrollX: { type: Number, default: 0 },
    scrollY: { type: Number, default: 0 },
    railOffset: { type: Number, default: 0 },
    railColor: { type: String, default: "default" },
    contentClass: { type: String, default: "" },
    yRailPosition: { type: String, default: "right" },
    forcedParam: { type: [Number, String, Boolean], default: undefined },
    resizable: { type: Boolean, default: true },
    skipOffset: { type: Boolean, default: false },
    withFadeBox: { type: Boolean, default: true },
    variableWidth: { type: Boolean, default: false },
    hideScrollbar: { type: Boolean, default: false },
    isAbsolute: Boolean,
    isRelative: Boolean,
});

/** Emits **/
const emit = defineEmits([
    "on-change",
    "scroll-end",
    "scroll-finish",
    "scroll-start",
    "scroll-top",
    "on-scroll",
    "close",
]);

/** Data **/
const axis = ref<IAxisData>({
    x: {
        clientAttr: "clientX",
        offsetAttr: "left",
        offsetSizeAttr: "offsetWidth",
        scrollSizeAttr: "scrollWidth",
        scrollOffsetAttr: "scrollLeft",
        scrollbarSize: 0,
        scrollLeft: props.scrollX || 0,
        click: 0,
    },
    y: {
        clientAttr: "clientY",
        offsetAttr: "top",
        offsetSizeAttr: "offsetHeight",
        scrollSizeAttr: "scrollHeight",
        scrollOffsetAttr: "scrollTop",
        scrollbarSize: 0,
        scrollTop: props.scrollY || 0,
        click: 0,
    },
});

const box = ref<HTMLElement | null>(null);
const yRail = ref<HTMLElement | null>(null);
const xRail = ref<HTMLElement | null>(null);
const yThumb = ref<HTMLElement | null>(null);
const xThumb = ref<HTMLElement | null>(null);
const wrapper = ref<HTMLElement | null>(null);
const content = ref<HTMLElement | null>(null);
const placeholder = ref<HTMLElement | null>(null);

const isTop = ref(false);
const isBottom = ref(false);
const isScrolling = ref(false);
const applyFadeBox = ref(false);
const dimensions = ref({
    boxHeight: 0,
    boxWidth: 0,
    contentHeight: 0,
    contentWidth: 0,
    yRailHeight: 0,
    yThumbHeight: 0,
    xRailWidth: 0,
    xThumbWidth: 0,
});

const scrollXTicking = ref(false);
const scrollYTicking = ref(false);

const isYOverflowing = ref(false);
const isXOverflowing = ref(false);

const draggingAxis = ref<string | null>(null);
const eventTimeout = ref<ReturnType<typeof setTimeout> | number | null>(null);

const yScrollPosition = computed(() => {
    if (!isYOverflowing.value) {
        return "0";
    }

    const scrollPercentage = axis.value.y.scrollTop / (dimensions.value.contentHeight - dimensions.value.boxHeight);
    const handleOffset = ~~((dimensions.value.yRailHeight - dimensions.value.yThumbHeight) * scrollPercentage);

    emit("on-change", { y: axis.value.y.scrollTop });
    return `translate3d(0, ${handleOffset}px, 0)`;
});

const xScrollPosition = computed(() => {
    if (!isXOverflowing.value) {
        return "0";
    }

    const scrollPercentage = axis.value.x.scrollLeft / (dimensions.value.contentWidth - dimensions.value.boxWidth);
    const handleOffset = ~~((dimensions.value.xRailWidth - dimensions.value.xThumbWidth) * scrollPercentage);

    emit("on-change", { x: axis.value.x.scrollLeft });
    return `translate3d(${handleOffset}px, 0, 0)`;
});

/* Обновление состояния и данных */
function update() {
    const contentHeight = content.value?.scrollHeight || 0;
    const contentWidth = content.value?.scrollWidth || 0;

    if (props.variableWidth) {
        const surplus = 5.6 * getFontSize();
        placeholder.value!.style.width = `${Math.round(contentWidth + surplus)}px`;
    }

    placeholder.value!.style.height = `${contentHeight}px`;

    const boxWidth = box.value?.offsetWidth || 0;
    const boxHeight = box.value?.offsetHeight || 0;

    isXOverflowing.value = contentWidth > boxWidth;
    isYOverflowing.value = contentHeight > boxHeight;

    nextTick(() => {
        dimensions.value.boxHeight = boxHeight;
        dimensions.value.boxWidth = boxWidth;
        dimensions.value.contentHeight = contentHeight;
        dimensions.value.contentWidth = contentWidth;

        if (boxHeight >= contentHeight) {
            emit("scroll-end", true);
        } else {
            emit("scroll-end", false);
        }

        if (isYOverflowing.value) {
            dimensions.value.yRailHeight = yRail.value!.offsetHeight;
            dimensions.value.yThumbHeight = getScrollbarSize("y");
        }

        if (isXOverflowing.value) {
            dimensions.value.xRailWidth = xRail.value!.offsetWidth;
            dimensions.value.xThumbWidth = getScrollbarSize("x");
        }

        if (props.scrollY) {
            wrapper.value!.scrollTop = props.scrollY;
        }

        if (props.scrollX) {
            wrapper.value!.scrollLeft = props.scrollX;
        }

        if (props.withFadeBox) {
            nextTick(() => {
                setFadeBox();
            });
        }
    });
}

/* Получаем размер скроллбара */
function getScrollbarSize(axis: "x" | "y"): number {
    if (axis === "y" && isYOverflowing.value || axis === "x" && isXOverflowing.value) {
        const contentSize = content.value![axis === "y" ? "scrollHeight" : "scrollWidth"];
        const trackSize = axis === "y" ? yRail.value!.offsetHeight : xRail.value!.offsetWidth;

        const scrollbarRatio = trackSize / contentSize;
        return Math.max(~~(scrollbarRatio * trackSize), 20);
    }
    return 0;
}

/* Обработка события скролла */
function onScroll() {
    isScrolling.value = true;
    const scrollPercentage = axis.value.y.scrollTop / (dimensions.value.contentHeight - dimensions.value.boxHeight);

    if (scrollPercentage < 0.02 || scrollPercentage === 0) {
        emit("scroll-finish", true);
    }

    if (scrollPercentage > 0.02) {
        emit("scroll-start", true);
    }

    if (!scrollXTicking.value && isXOverflowing.value) {
        requestAnimationFrame(() => {
            axis.value.x.scrollLeft = wrapper.value!.scrollLeft;
            scrollXTicking.value = false;
        });
        scrollXTicking.value = true;
    }

    if (!scrollYTicking.value && isYOverflowing.value) {
        if (!wrapper.value) {
            return;
        }

        requestAnimationFrame(() => {
            axis.value.y.scrollTop = wrapper.value!.scrollTop;
            scrollYTicking.value = false;
        });

        scrollYTicking.value = true;

        eventTimeout.value = setTimeout(() => {
            clearInterval(eventTimeout.value!);
    
            const scrollPercentage =
                axis.value.y.scrollTop / (dimensions.value.contentHeight - dimensions.value.boxHeight);

            if (scrollPercentage > 0.92) {
                emit("scroll-end", true);
            } else {
                emit("scroll-end", false);
            }

            if (scrollPercentage < 0.02) {
                emit("scroll-top", true);
            } else {
                emit("scroll-top", false);
            }

            if (scrollPercentage > 0.02) {
                emit("scroll-start", true);
            }

            if (props.withFadeBox) {
                nextTick(() => {
                    setFadeBox();
                });
            }
        }, 10);
    }

    emit("on-scroll", {
        x: axis.value.x.scrollLeft,
        y: axis.value.y.scrollTop,
    });

    setTimeout(() => {
        isScrolling.value = false;
    }, 1000);
}

/* Обработка клика по ползунку */
function onThumbClick(e: MouseEvent, dir: "x" | "y") {
    e.stopImmediatePropagation();

    draggingAxis.value = dir;
    const clientAttr = axis.value[dir].clientAttr as keyof MouseEvent;        
    axis.value[dir].click = e[clientAttr] as number;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    document.onselectstart = () => false;
}

/* Обработка движения мышки при захвате ползунка */
function onMouseMove(e: MouseEvent) {
    const prevPage = axis.value[draggingAxis.value as "x" | "y"].click;

    if (!prevPage) {
        return;
    }

    const rail = draggingAxis.value === "y" ? yRail.value : xRail.value as HTMLDivElement;
    const thumb = draggingAxis.value === "y" ? yThumb.value : xThumb.value as HTMLDivElement;
    const wrapperRef = wrapper.value as HTMLDivElement;
    const dir = draggingAxis.value as "x" | "y";

    if (!rail || !thumb || !wrapperRef) {
        return;
    }

    const offset =
        (rail.getBoundingClientRect()[axis.value[dir].offsetAttr] -
            e[axis.value[dir].clientAttr]) *
        -1;
    const thumbClickPosition =
        thumb[axis.value[dir].offsetSizeAttr] - prevPage;
    const thumbPositionPercentage =
        (offset - thumbClickPosition) * 100 /
        rail[axis.value[dir].offsetSizeAttr];

    wrapperRef[axis.value[dir].scrollOffsetAttr] =
        thumbPositionPercentage *
        wrapperRef[axis.value[dir].scrollSizeAttr] /
        100;
}

function onMouseUp(e: MouseEvent) {
    e.preventDefault();
    axis.value[draggingAxis.value as "x" | "y"].click = 0;
    draggingAxis.value = null;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    document.onselectstart = null;
}


/* Обработка клика по участку сколлбара (не ползунок) */
const onRailClick = (e: MouseEvent, dir: "x" | "y") => {
    if (e.target === (dir === "y" ? yThumb.value : xThumb.value)) {
        return;
    }
    const offset = Math.abs(e.target.getBoundingClientRect()[axis.value[dir].offsetAttr] - e[axis.value[dir].clientAttr]);
    const rail = dir === "y" ? yRail.value : xRail.value;
    const thumb = dir === "y" ? yThumb.value : xThumb.value;
    const wrapperRef = wrapper.value;

    if (!rail || !thumb || !wrapperRef) {
        return;
    }

    const thumbHalf = thumb[axis.value[dir].offsetSizeAttr] / 2;
    const thumbPositionPercentage =
        (offset - thumbHalf) * 100 / rail[axis.value[dir].offsetSizeAttr];

    wrapperRef[axis.value[dir].scrollOffsetAttr] =
        thumbPositionPercentage * wrapperRef[axis.value[dir].scrollSizeAttr] /
        100;
};

/* Для задания fade-эффекта контенту при скролле */
function setFadeBox() {
    if (!wrapper.value || !content.value || !yRail.value || !yThumb.value) {
        return;
    }

    const contentHeight = content.value.clientHeight;
    const wrapperHeight = wrapper.value.clientHeight;
    const yThumbRect = yThumb.value.getBoundingClientRect();
    const yRailRect = yRail.value.getBoundingClientRect();

    isTop.value = yThumbRect.top - 5 <= yRailRect.top;
    isBottom.value = yThumbRect.bottom + 5 >= yRailRect.bottom;
    applyFadeBox.value = contentHeight > wrapperHeight;
}

/* Эмитим событие закрытия */
function closeBox() {
    emit("close");
}

/** Watchers **/
watch(() => props.forcedParam, () => {
    nextTick(() => {
        update();
    });
});

/** Life Cycle Hooks **/
onMounted(() => {
    if (props.resizable) {
        addResizeListener(content.value!, update);
    } else {
        update();
    }

    if (props.variableWidth) {
        window.addEventListener("resize", closeBox);
    }
});

onBeforeUnmount(() => {
    if (props.resizable) {
        removeResizeListener(content.value!, update);
    }

    if (props.variableWidth) {
        window.removeEventListener("resize", closeBox);
    }
});
</script>


<style
    lang="scss"
    module
>
    .ScrollBox {
        position: relative;
        overflow: hidden;

        &.is-absolute {
            position: absolute;
        }

        &.is-skip-offset {
            .scrollbar.vertical.right {
                right: 0;
            }
        }

        &.fade-box {
            @include fade-box();

            &:after {
                overflow: hidden;
                bottom: -.2rem;
                border-radius: $r-xs;
            }

            &:before {
                overflow: hidden;
                top: -.2rem;
                border-radius: $r-xs;
            }

            &.is-top {
                &:before {
                    z-index: 0;
                    opacity: 0;
                    visibility: hidden;
                }
            }

            &.is-bottom {
                &:after {
                    z-index: 0;
                    opacity: 0;
                    visibility: hidden;
                }        
            }

            @include themify($themes) {
                &:before {
                    background: linear-gradient(to bottom, rgba(themed(bg-soft), 1), rgba(themed(bg-soft), .5) 50%, rgba(themed(bg-soft), .1) 100%);
                }

                &:after {
                    background: linear-gradient(to top, rgba(themed(bg-soft), 1), rgba(themed(bg-soft), .5) 50%, rgba(themed(bg-soft), .1) 100%);
                }
            }
        }

        @include themify($themes) {   
            &.--default {
                .scrollbar {
                    background-color: rgba(themed(bg-main), .5);
                    transition: background-color .3s ease-in-out;

                    @include hover {
                        background-color: rgba(themed(bg-main), .8);
                    }
                }

                .thumb {
                    background-color: rgba(themed(primary), .5);
                    transition: background-color .3s ease-in-out;

                    &.is-scrolling {
                        background-color: rgba(themed(primary), .8);
                    }

                    @include hover {
                        background-color: rgba(themed(primary), .8);
                    }
                }
            }
        }

        .wrapper {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 0;
            box-sizing: border-box;
            overflow: auto;
            width: auto;
            max-width: 100%;
            height: 100%;
            max-height: 100%;
            scrollbar-width: none;
            -ms-overflow-style: none;

            &::-webkit-scrollbar {
                display: none;
                -webkit-appearance: none;
                width: 0;
                height: 0;
            }

            &::-webkit-scrollbar-track {
                background-color: transparent;
            }

            &::-webkit-scrollbar-thumb {
                background-color: transparent;
            }
        }

        .placeholder {
            width: 100%;
            max-width: 100%;
            max-height: 100%;
            pointer-events: none;
        }

        .content {
            padding: $s-xxs;
        }

        .scrollbar {
            position: absolute;
            right: 0;
            bottom: 0;
            z-index: 4;
            overflow: hidden;
            width: 6px;
            border-radius: $r-xs;
            cursor: pointer;

            &.horizontal {
                left: 0;
                width: 100%;
                height: 1px;

                .thumb {
                    bottom: 1px;
                    left: 0;
                    height: 1px;
                }
            }

            &.vertical {
                top: 0;

                .thumb {
                    top: 0;
                    right: 0;
                    width: 6px;
                }

                &.right {
                    right: 0;
                }

                &.left {
                    right: auto;
                    left: 0;
                }
            }

            .thumb {
                position: absolute;
                border-radius: $r-xs;
                cursor: grab;

                &:active {
                    cursor: grabbing;
                }
            }
        }
    }
</style>
