import HTTPInstance from "../apiConfig";
import type { ICocktailResponseData } from "@/interfaces/schemes";

const PATH_API = "api/json/v1/1/search.php";

export class CocktailApi extends HTTPInstance {
    async bySlug(searchParam: string): Promise<ICocktailResponseData | null> {
        let result = null;

        try {
            const query = searchParam ? `?s=${searchParam}` : "";
            const res = await this.request<ICocktailResponseData>("GET", `${PATH_API}${query}`);

            result = res;

            return result;
        } catch (error) {
            console.warn("[api/apiCocktails]: Something error", error);

            return result;
        }
    }
}
