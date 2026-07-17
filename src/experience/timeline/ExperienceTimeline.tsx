import type { ReactNode } from "react"; import type { ExperienceSection } from "./timelineTypes";
export function ExperienceTimeline({ section, children }: { section?: ExperienceSection; children: (section: ExperienceSection) => ReactNode }) { return section ? <>{children(section)}</> : null; }
