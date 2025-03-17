type TCocktailBaseFields = {
    idDrink: string;
    strDrink: string;
    strDrinkAlternate: string | null;
    strTags: string | null;
    strVideo: string | null;
    strCategory: string;
    strIBA: string | null;
    strAlcoholic: string;
    strGlass: string;
    strInstructions: string;
    strInstructionsDE: string | null;
    strInstructionsES: string | null;
    strInstructionsFR: string | null;
    strInstructionsIT: string | null;
    strInstructionsZH_HANS: string | null;
    strInstructionsZH_HANT: string | null;
    strDrinkThumb: string;
    strImageSource: string | null;
    strImageAttribution: string | null;
    strCreativeCommonsConfirmed: string;
    dateModified: string;
};

type TRange<N extends number, A extends number[] = []> = A["length"] extends N
    ? A[number]
    : TRange<N, [...A, A["length"]]> extends infer R
        ? Exclude<R, 0>
        : never;

type IngredientNumber = TRange<16>;

export type TCocktailScheme = TCocktailBaseFields & {
    // eslint-disable-next-line
    [K in `strIngredient${IngredientNumber}`]?: string | null;
} & {
    // eslint-disable-next-line
    [K in `strMeasure${IngredientNumber}`]?: string | null;
};

export interface ICocktailResponseData {
    drinks: TCocktailBaseFields[] | null;
}
