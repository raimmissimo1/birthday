import { CinematicIntro } from "./CinematicIntro"; import { CountdownIntro } from "./CountdownIntro"; import { FakeChatIntro } from "./FakeChatIntro"; import { TypedTerminalIntro } from "./TypedTerminalIntro";
export const introRegistry = { terminal: TypedTerminalIntro, cinematic: CinematicIntro, "fake-chat": FakeChatIntro, countdown: CountdownIntro };
