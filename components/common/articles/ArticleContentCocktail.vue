<template>
    <div :class="[$style.ArticleContentCocktail, 'spaces-box']">
        <div :class="$style.content">
            <div :class="[$style.info]">
                <div
                    v-for="infoItem in infoList"
                    :key="infoItem.name"
                    :class="[$style['info-item']]"
                >
                    <div                         
                        v-if="item[infoItem.field]"
                        :class="$style['info-field']"
                    >
                        <Heading
                            tag="h4"
                            size="xxs"
                            :color="infoItem.color"
                            :icon="infoItem.icon"
                            :title="`${infoItem.name}`"
                            :class="$style.label"
                        />
                        
                        <p
                            :class="$style.value"
                            v-html="`${item[infoItem.field]}`"
                        />
                    </div>
                </div>

                <div
                    v-if="item.strInstructions"
                    :class="$style.instruction"
                >
                    <Heading
                        tag="h5"
                        size="xs"
                        color="soft"
                        icon="dashicons:text"
                        :title="`Instructions`"
                    />

                    <p
                        :class="$style['instruction-value']"
                        v-html="item.strInstructions"
                    />
                </div>
            </div>

            <div :class="$style['image-wrapper']">
                <NuxtImg 
                    format="webp"
                    alt="Example"
                    loading="lazy"
                    :placeholder="IMAGE_PLACEHOLDER"
                    :src="item.strDrinkThumb"
                    :class="$style.image"
                />
            </div>
        </div>

        <template v-if="item.ingredients?.length">
            <Heading
                tag="h5"
                size="xs"
                icon="game-icons:cherry"
                :title="`Ingredients`"
            />

            <ul :class="$style.ingredients">
                <li
                    v-for="ingredient in item.ingredients"
                    :key="ingredient.label"
                    :class="[$style.ingredient, 'flex-row-center']"
                >
                    <span
                        :class="$style['ingredient-label']"
                        v-html="`${ingredient.label}:`"
                    />

                    <span
                        :class="$style['ingredient-value']"
                        v-html="ingredient.value || '—'"
                    />
                </li>
            </ul>
        </template>
    </div>
</template>


<script
    lang="ts"
    setup
>
/** Imports */
/* vue */
import {
    defineProps,
} from "vue";

/* types */
import type { TCoctailItem } from "@/components/common/articles/types";

/* constants */
import { IMAGE_PLACEHOLDER } from "@/assets/ts/constants/common-constants";


/* components */
import Heading from "@/components/ui/heading/Heading";

const infoList = [
    {
        name: "Name",
        icon: "ci:text",
        field: "strDrink",
        color: "primary",
    },
    {
        name: "Category",
        icon: "ph:list-star",
        field: "strCategory",
        color: "success",
    },
    {
        name: "Glass",
        icon: "tabler:glass-full-filled",
        field: "strGlass",
        color: "error",
    },
];

const props = defineProps<{item: TCoctailItem}>();
const { item } = toRefs(props);
</script>

<style
    lang="scss"
    module
>
    .ArticleContentCocktail {
        @include themify($themes) {
            .image-wrapper {
                border: $border-size-md solid themed(primary);
                background-color: rgba(themed(bg-accent), .4);
            }

            .ingredient-label {
                color: themed(cl-soft);
            }

            .ingredient-value {
                color: themed(cl-main);
            }
        }

        .content {
            display: flex;
            justify-content: space-between;
            gap: .8rem;
        }

        .title {
            margin-bottom: 3.2rem;
        }

        .image-wrapper {
            overflow: hidden;
            width: 48rem;
            height: 48rem;
            border-radius: $r-md;
            
            .image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: $r-sm;
                transition: transform .3s ease-in-out;
            }

            @include hover {
                .image {
                    transform: scale(1.1);
                }
            }
        }

        .info {
            max-width: 50%;
        }

        .info-item {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-bottom: 2.4rem;
        }

        .info-field {
            display: flex;
            flex-direction: column;
            gap: .8rem;
        }

        .instruction {
            margin-top: 3.2rem;
            margin-bottom: 3.2rem;
        }

        .instruction-value {
            @include text(p3);

            margin-top: 1.2rem;
        }

        .ingredients {
            max-width: 50%;
            margin-top: 1.2rem;
        }

        .ingredient {
            display: grid;            
            grid-template-columns: repeat(2, 1fr);

            &:not(:last-child) {
                margin-bottom: .8rem;
            }
        }

        .ingredient-label {
            @include text(l3);
        }

        .ingredient-value {
            @include text(p3);
        }

        @include respond-to(xs) {
            .image-wrapper {
                width: 34rem;
                height: 34rem;
            }
        }

        @include respond-to(xxs) {
            .content {
                flex-direction: column-reverse;
                gap: 2.4rem;
            }

            .info {
                max-width: 100%;
            }

            .info-field {
                gap: .8rem;
            }

            .image-wrapper {
                width: 100%;
                height: 60vw;
            }

            .ingredients {
                max-width: 100%;
                gap: 2.4rem;
                padding-bottom: 2.4rem;
            }

            .instruction {
                max-width: 100%;
                margin-top: 0;
            }

            .value {
                @include text(p3);
            }
        }
    }
</style>
