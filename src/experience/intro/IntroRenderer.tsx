import { introRegistry } from "./introRegistry"; import type { IntroProps, IntroVariant } from "./introTypes";
export function IntroRenderer({ variant, ...props }: IntroProps & { variant: IntroVariant }) { const Component = introRegistry[variant]; return <Component {...props} />; }
