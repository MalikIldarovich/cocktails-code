import type { TSizes, TColors } from "@/components/ui/types";

export interface ISwitchProps {
    name?: string;
    icon?: string;
    value?: string | boolean | number | undefined;
    trueValue?: string | boolean;
    falseValue?: string | boolean;
    reverse?: boolean;
    disabled?: boolean;
    changeActiveLabel: boolean;
    size?: Extract<TSizes, "sm" | "md" | "lg">;
    color?: Extract<TColors, "primary" | "default">;
}
