<template>
    <nav 
        v-outside="handleClose"
        :class="[$style.Navigation, {[$style.opened]: isMenuOpen}]"
    >
        <IconContainer
            :class="$style['menu-open-button']"
            @hover="handleMenuHover"
            @click="handleMenuClick"
        >
            <Icon 
                width="32"
                height="32"
                icon="line-md:chevron-left-circle"
            />
        </IconContainer>

        <ScrollBox 
            :hide-scrollbar="!isMenuOpen"
            :class="$style.box"
        >
            <template v-if="list.length">
                <div 
                    v-for="item in list"
                    :key="item.id"
                    :class="$style.wrapper"
                >
                    <NuxtLink 
                        :to="item.to"
                        :class="[$style.link, [activePath === item.to ? $style.active : '']]"
                    >
                        <div 
                            :class="[
                                $style['link-wrapper'],
                                'flex-row-center',
                            ]"
                        >
                            <CirclePin 
                                v-if="activePath === item.to"
                                color="error"
                                animate="pulse"
                                :class="$style.pin"
                            />

                            <IconContainer
                                @hover="handleMenuHover"
                                @click="handleMenuClick"
                            >
                                <Icon
                                    :key="item.id"
                                    ssr
                                    width="32"
                                    height="32"
                                    :icon="item.icon"
                                    :class="$style.icon"
                                />
                            </IconContainer>

                            <transition name="slide">
                                <div 
                                    v-if="isMenuOpen"
                                    :class="[$style.name, 'flex-row-center']"
                                >
                                    <span 
                                        :class="$style.label"
                                        v-html="item.label"
                                    />
                                </div>
                            </transition>
                        </div>                                                          
                    </NuxtLink>
                </div>
            </template>
        </ScrollBox>
    </nav>
</template>

<script 
    setup
    lang="ts"
>
/** Imports **/
/* vue */
import {
    ref,
    toRefs,
    defineProps,
    withDefaults,
} from "vue";

import { useRoute } from "nuxt/app";

/* types */
import type { INavigationProps } from "@/components/layout/navigation/types";

/* components */
import { Icon } from "@iconify/vue";
import ScrollBox from "@/components/ui/scroll-box/ScrollBox";
import IconContainer from "@/components/ui/icon-container/IconContainer";

/** Props **/
const props = withDefaults(defineProps<INavigationProps>(), {
    list: () => [],
});

const { list } = toRefs(props);

/** Data **/
const route = useRoute();
const isMenuOpen = ref(false);
const isMenuHover = ref(false);

/** Computed **/
const activePath = computed(() => route.path);

/** Handlers **/
const handleMenuHover = (val: boolean) => {
    isMenuHover.value = Boolean(val);
};

const handleMenuClick = () => {
    isMenuOpen.value = !isMenuOpen.value;
};
    
const handleClose = () => {
    isMenuOpen.value = false;
};
</script>

<style
    lang="scss"
    module
>
    .Navigation {
        position: relative;
        z-index: 10;
        padding: $s-xxxl 0 0;
        user-select: none;
        width: 7.2rem;

        @include themify($themes) {
            border-right: 1px solid themed(box-border-color);
            background-color: themed(bg-nav);
            color: themed(cl-soft);
            box-shadow: $default-shadow-sm;
            transition: $theme-transition, width .6s ease-in-out;

            .menu-open-button {
                background-color: themed(bg-nav);
                color: $cl-nav;
                box-shadow: themed(shadow-base);

                @include hover {
                    color: themed(primary);
                }
            }

            .link {
                &,
                &.active {
                    @include hover {

                        .link-wrapper {
                            background-color: themed(bg-accent);
                            
                            .label {
                                color: themed(cl-main);
                            }
                        }
                    }
                }

                &.active {
                    cursor: default;

                    .link-wrapper {
                        background-color: rgba(themed(bg-accent), .4);

                        .label {
                            color: themed(cl-main);
                        }
                    }
                }

                .icon,
                .label,
                .link-wrapper {
                    transition: $default-transition, $theme-transition;
                }

                .link-wrapper {
                    .icon {
                        color: themed(primary);
                    }
                }

                &:not(:last-child) {
                    border-bottom: 1px solid themed(bg-main);
                }
            }
        }

        &.opened {
            width: 24rem;

            .menu-open-button {
                transform: rotate(0);
            }

            .link {
                .name {
                    opacity: 1;
                    width: calc(32rem - 6.4rem - 8rem);
                    max-width: calc(32rem - 6.4rem - 8rem);
                }
            }
        }

        .box,
        .wrapper {
            overflow-y: visible;
            height: 100%;
        }

        .menu-open-button {
            position: absolute;
            top: 1.2rem;
            right: -1.2rem;
            z-index: 4;
            width: 3.2rem;
            height: 3.2rem;
            border-radius: 50%;
            cursor: pointer;
            transform: rotate(-180deg);
            transition: $theme-transition, transform .6s ease-in-out;
        }

        .link {
            position: relative;
            cursor: pointer;

            .link-wrapper {
                position: relative;
                overflow: hidden;
                gap: 1.2rem;
                padding: $s-md;
                border-radius: $r-xs;
                background-color: transparent;
                white-space: nowrap;
            }

            .name {
                gap: .4rem;
                width: 0;
                max-width: 0;
                opacity: 0;
                color: rgba($cl-nav, .8);
                transition: opacity .6s ease-in-out, width .3s ease-in-out, color .3s ease-in-out;
            }

            .pin {
                position: absolute;
                top: 1.4rem;
                left: 4.5rem;
            }
        }

        .icon {
            width: 3.2rem;
            min-width: 3.2rem;
            height: 3.2rem;
            padding: $s-xxs;
        }

        .label {
            font-size: 1.6rem;
            font-weight: semibold;
        }

        @include respond-to(xxs) {
            width: 2.4rem;
        }
    }
</style>
