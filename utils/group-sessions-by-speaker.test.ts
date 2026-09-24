import { describe, expect, it } from "vitest";

import type { Session } from "@/types/session";

import { groupSessionsBySpeaker } from "./group-sessions-by-speaker";

function session(overrides: Partial<Session> = {}): Session {
  return {
    id: "a-session",
    title: "A session",
    speaker: "A speaker",
    track: "React",
    room: "Main Hall",
    startTime: "09:00",
    durationMinutes: 45,
    description: "",
    level: "beginner",
    ...overrides,
  };
}

describe("groupSessionsBySpeaker", () => {
  it("groups sessions by speaker", () => {
    const groups = groupSessionsBySpeaker([
      session({ id: "s1", speaker: "Marta Fernandez" }),
      session({ id: "s2", speaker: "Iker Otxoa" }),
      session({ id: "s3", speaker: "Marta Fernandez" }),
    ]);

    expect(groups).toEqual([
      {
        speaker: "Iker Otxoa",
        sessions: [expect.objectContaining({ id: "s2" })],
      },
      {
        speaker: "Marta Fernandez",
        sessions: [
          expect.objectContaining({ id: "s1" }),
          expect.objectContaining({ id: "s3" }),
        ],
      },
    ]);
  });

  it("sorts speakers alphabetically regardless of input order", () => {
    const groups = groupSessionsBySpeaker([
      session({ id: "s1", speaker: "Sofia Almeida" }),
      session({ id: "s2", speaker: "Diego Castellanos" }),
    ]);

    expect(groups.map((group) => group.speaker)).toEqual([
      "Diego Castellanos",
      "Sofia Almeida",
    ]);
  });

  it("sorts a speaker's own sessions chronologically regardless of input order", () => {
    const groups = groupSessionsBySpeaker([
      session({
        id: "afternoon",
        speaker: "Marta Fernandez",
        startTime: "14:00",
      }),
      session({
        id: "morning",
        speaker: "Marta Fernandez",
        startTime: "09:00",
      }),
    ]);

    expect(groups[0]?.sessions.map((s) => s.id)).toEqual([
      "morning",
      "afternoon",
    ]);
  });

  it("excludes the closing panel's placeholder speaker", () => {
    const groups = groupSessionsBySpeaker([
      session({ id: "s1", speaker: "Marta Fernandez" }),
      session({
        id: "closing-panel",
        speaker: "Full speaker lineup",
      }),
    ]);

    expect(groups).toHaveLength(1);
    expect(groups[0]?.speaker).toBe("Marta Fernandez");
  });

  it("returns nothing for no sessions", () => {
    expect(groupSessionsBySpeaker([])).toEqual([]);
  });
});
