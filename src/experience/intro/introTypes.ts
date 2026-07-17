export type IntroVariant = "terminal" | "cinematic" | "fake-chat" | "countdown";
export type IntroProps = { lines: string[]; accentColor?: string; onComplete: () => void; reducedMotion?: boolean; characterDelayMs?: number; lineDelayMs?: number; finalDelayMs?: number };
