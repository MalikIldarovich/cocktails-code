import { defineNuxtPlugin } from "nuxt/app";
import { $fetch, type FetchOptions } from "ofetch";
import { CocktailApi } from "../config/api/modules/cocktail";

export interface IApiInstance {
    cocktail: CocktailApi;
}

export default defineNuxtPlugin(nuxtApp => {
    const endpoint = nuxtApp.$config.PROXY_URL || process.env.PROXY_URL;

    console.log("endpoint", endpoint);
    const fetchOptions: FetchOptions = {
        baseURL: endpoint,
    };

    const apiFetcher = $fetch.create(fetchOptions);

    const modules: IApiInstance = {
        cocktail: new CocktailApi(apiFetcher),
    };

    return {
        provide: {
            fetchData: modules,
        },
    };
});
