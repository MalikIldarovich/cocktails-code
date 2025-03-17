import type { TSizes, TColors } from "@/components/ui/types.ts";

export interface ICirclePinProps {
    size?: Extract<TSizes, "sm" | "md" | "lg" | "xl">;
    color?: Extract<TColors, "error" | "warning" | "success">;
    animate?: "pulse" | "";
}
