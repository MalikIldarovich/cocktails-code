import type { TSizes, TColors, TWeights, TTagTitle } from "@/components/ui/types";

export interface IHeadingProps {
    tag?: TTagTitle;
    size?: TSizes;
    color?: Extract<TColors, "default" | "soft" | "primary" | "secondary" | "dark" | "light" | "error" | "warning" | "success"> | "inherit";
    weight?: Extract<TWeights, "normal" | "medium" | "semibold" | "bold">;
    icon?: string;
    title?: string;
    classes?: string;
    ellipsis?: boolean;
    uppercase?: boolean;
    isLoading?: boolean;
    withLoader?: boolean;
    textShadow?: boolean;
    skeletonWidth?: number;
    skeletonHeight?: number;
}
