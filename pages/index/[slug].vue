<template>
    <div :class="$style.CocktailPage">
        <div :class="$style.container">
            <template v-if="list?.length">
                <!-- ARTICLES LIST -->
                <ArticleContainer
                    v-for="item in list"
                    :key="item.idDrink"
                    :class="$style.article"
                >
                    <!-- TOP -->
                    <template 
                        v-if="formatDate(item.dateModified)"
                        #top
                    >
                        <Heading
                            tag="h3"
                            icon="mingcute:calendar-fill"
                            size="xxs"
                            color="primary"
                            :title="formatDate(item.dateModified)"
                        />
                    </template>

                    <!-- MIDDLE -->
                    <template #middle>
                        <ArticleContentCocktail :item="item" />
                    </template>

                    <!-- BOTTOM -->
                    <template v-if="item.tags?.length" #bottom>
                        <ul :class="[$style.tags, 'flex-row-center']">
                            <li
                                v-for="tag in item.tags"
                                :key="tag"
                                :class="$style.tag"
                                v-html="`#${tag}`"
                            />
                        </ul>
                    </template>
                </ArticleContainer>
            </template>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup
>
/** Imports */
/* vue & nuxt */
import { computed } from "vue";
import {
    useRoute,
    useError,
    useNuxtApp,
    useAsyncData,
} from "nuxt/app";

/* pinia */
import { useCocktailStore } from "@/store/cocktail";

/* types */
import type { IApiInstance } from "@/plugins/fetch-data";
import type { TCocktailScheme } from "@/interfaces/schemes";
import type { TCoctailItem } from "@/components/common/articles/types";

/* utils */
import { formatDate } from "@/assets/ts/utils/convertation-utils";

/* constants */
import {
    ERROR_DATA_404,
    ERROR_DATA_500,
} from "@/assets/ts/constants/errors-constants";


/* components */
import { Icon } from "@iconify/vue";
import Heading from "@/components/ui/heading/Heading";
import ArticleContainer from "@/components/common/articles/ArticleContainer";
import ArticleContentCocktail from "@/components/common/articles/ArticleContentCocktail";

/** Data */
const { $fetchData } = useNuxtApp();
const error = useError();
const route = useRoute();
const cocktailsStore = useCocktailStore();


/** Async Data */
const { data } = useAsyncData("cocktailPage", async () => {
    let cocktails = [];
    const slugParam = Array.isArray(route.params.slug) 
        ? route.params.slug[0]
        : route.params.slug;

    const slug: string = slugParam || "margarita";
    const fetchData = $fetchData as IApiInstance;

    try {
        if (!cocktailsStore.cocktails || !cocktailsStore.cocktails[slug]?.length) {
            const [cocktailsRes] = await Promise.all([
                fetchData.cocktail.bySlug(slug),
            ]);

            cocktailsStore.setCocktailsList(cocktailsRes?.drinks || [], slug);
            cocktails = cocktailsRes?.drinks || [];
        } else {
            cocktails = cocktailsStore.cocktails?.[slug];
        }

        if (!cocktails?.length) {
            error.value = {
                ...ERROR_DATA_404,
                toJSON: () => ERROR_DATA_404,
            };
        }

        return {
            cocktails,
        };
    } catch (e) {
        console.log("[CocktailPage/useAsyncData]: ", e);
        error.value = {
            ...ERROR_DATA_500,
            toJSON: () => ERROR_DATA_500,
        };
    }
});


/** Computeds */
const list: ComputedRef<TCoctailItem[]> = computed(() => {
    if (!data?.value?.cocktails?.length) {
        return [];
    }

    return data?.value?.cocktails?.map((el: TCocktailScheme) => {
        const tags = el.strTags?.split(",") || [];
        const ingredients: { label: string; value: string }[] = [];

        for (let i = 0; i < 15; i++) {
            const label = `strIngredient${i+1}` as keyof TCocktailScheme;
            const value = `strMeasure${i+1}` as keyof TCocktailScheme;

            if (el[label] && label in el && value in el) {
                ingredients.push({
                    label: el[label] as string,
                    value: el[value] as string,
                });
            }
        }

        return {
            ...el,
            tags,
            ingredients,
        };
    });
});
</script>


<style
    lang="scss"
    module
>
    .CocktailPage {
        overflow: hidden;
        width: 100%;
        padding: $s-xl;

        @include themify($themes) {
            .tag {
                color: themed(cl-soft);
            }
        }

        .container {
            width: 100%;
            max-width: 102.4rem;
            margin: 0 auto;
        }

        .article {
            width: 100%;
            user-select: none;

            &:not(:first-child) {
                margin-top: $s-xl;
            }
        }

        .tags {
            flex-wrap: wrap;
            gap: .8rem;
            font-style: italic;

            @include text(l3-semibold);
        }

        @include respond-to(xxs) {
            padding: $s-sm;

            .tags {
                gap: .4rem .6rem;
                font-size: 1.2rem;
            }

            .article {
                &:not(:first-child) {
                    margin-top: $s-md;
                }
            }
        }
    }
</style>
