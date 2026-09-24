import type { Session } from "@/types/session";
import { timeToMinutes } from "@/utils/schedule-time";

export interface SpeakerSessions {
  speaker: string;
  sessions: Session[];
}

/**
 * The closing panel is a Q&A with the whole lineup, not a single person — its
 * `speaker` column holds this placeholder instead of a name. It must never
 * show up as its own card on the Speakers page.
 */
const NON_SPEAKER_LABELS = ["Full speaker lineup"];

/**
 * Groups sessions by speaker, sorted alphabetically by name, with each
 * speaker's own sessions sorted chronologically. Excludes placeholder
 * "speakers" that aren't a single named person (see NON_SPEAKER_LABELS).
 */
export function groupSessionsBySpeaker(sessions: Session[]): SpeakerSessions[] {
  const bySpeaker = new Map<string, Session[]>();

  for (const session of sessions) {
    if (NON_SPEAKER_LABELS.includes(session.speaker)) continue;

    const existing = bySpeaker.get(session.speaker);
    if (existing) {
      existing.push(session);
    } else {
      bySpeaker.set(session.speaker, [session]);
    }
  }

  return Array.from(bySpeaker, ([speaker, speakerSessions]) => ({
    speaker,
    sessions: [...speakerSessions].sort(
      (a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime),
    ),
  })).sort((a, b) => a.speaker.localeCompare(b.speaker));
}
