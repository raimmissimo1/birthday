import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ExperienceSection, TimelineState } from "./timelineTypes";

const initialState: TimelineState = { currentSectionIndex: 0, status: "idle", sceneReady: false, userInteracted: false };

export function useExperienceTimeline(sections: ExperienceSection[]) {
  const activeSections = useMemo(() => sections.filter((section) => section.enabled !== false), [sections]);
  const [state, setState] = useState(initialState);
  const completed = useRef(false);
  const start = useCallback(() => { completed.current = false; setState((current) => ({ ...current, currentSectionIndex: 0, status: "playing", userInteracted: true })); }, []);
  const next = useCallback(() => setState((current) => {
    if (completed.current) return current;
    const isLast = current.currentSectionIndex >= activeSections.length - 1;
    if (isLast) { completed.current = true; return { ...current, status: "complete" }; }
    return { ...current, currentSectionIndex: current.currentSectionIndex + 1, status: "playing" };
  }), [activeSections.length]);
  const skip = useCallback(() => { if (activeSections[state.currentSectionIndex]?.skippable !== false) next(); }, [activeSections, next, state.currentSectionIndex]);
  const replay = useCallback(() => { completed.current = false; setState((current) => ({ ...current, currentSectionIndex: 0, status: "playing" })); }, []);
  const setSceneReady = useCallback((sceneReady: boolean) => setState((current) => ({ ...current, sceneReady })), []);
  useEffect(() => { setState(initialState); completed.current = false; }, [sections]);
  return { state, currentSection: activeSections[state.currentSectionIndex], start, next, skip, replay, setSceneReady };
}
