import type { TCocktailScheme } from "@/interfaces/schemes";

export interface IArticleContainerProps {
    underline?: boolean;
}

export type TInfoItem = { label: string; value: string | null }

export type TCoctailItem = TCocktailScheme & {
    tags: string[] | null;
    ingredients: TInfoItem[];
}
