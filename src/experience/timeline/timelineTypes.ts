export type ExperienceSectionType = "typed-message" | "countdown" | "cinematic-text" | "fake-chat" | "photo-gallery" | "cake-reveal" | "birthday-card" | "candle-interaction" | "quote" | "balloons" | "fireworks" | "confetti" | "heart-finale" | "final-message";

export interface BaseExperienceSection { id: string; type: ExperienceSectionType; enabled?: boolean; durationMs?: number; skippable?: boolean }
export interface TypedMessageSection extends BaseExperienceSection { type: "typed-message"; variant: "terminal"; lines?: string[]; characterDelayMs?: number; lineDelayMs?: number; finalDelayMs?: number }
export interface CountdownSection extends BaseExperienceSection { type: "countdown"; variant: "countdown" }
export interface CinematicTextSection extends BaseExperienceSection { type: "cinematic-text"; variant: "cinematic"; lines?: string[] }
export interface FakeChatSection extends BaseExperienceSection { type: "fake-chat"; variant: "fake-chat"; messages?: string[] }
export interface GallerySection extends BaseExperienceSection { type: "photo-gallery"; variant?: "four-frames-3d" | "polaroid" | "carousel" | "memory-grid" }
export type ExperienceSection = TypedMessageSection | CountdownSection | CinematicTextSection | FakeChatSection | GallerySection | BaseExperienceSection;
export interface TimelineState { currentSectionIndex: number; status: "idle" | "playing" | "waiting" | "complete"; sceneReady: boolean; userInteracted: boolean }
