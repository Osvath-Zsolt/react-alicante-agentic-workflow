import { describe, expect, it } from "vitest";

import { render, screen } from "@/tests/utils/render";
import type { Session } from "@/types/session";
import type { SpeakerSessions } from "@/utils/group-sessions-by-speaker";

import { SpeakerCard } from "./speaker-card";

function session(overrides: Partial<Session> = {}): Session {
  return {
    id: "opening-keynote",
    title: "Opening Keynote",
    speaker: "Marta Fernandez",
    track: "React",
    room: "Main Hall",
    startTime: "09:00",
    durationMinutes: 45,
    description: "",
    level: "beginner",
    ...overrides,
  };
}

describe("SpeakerCard", () => {
  it("shows the speaker's name and their session's time and title", () => {
    const speaker: SpeakerSessions = {
      speaker: "Marta Fernandez",
      sessions: [session()],
    };

    render(<SpeakerCard speaker={speaker} />);

    expect(screen.getByText("Marta Fernandez")).toBeInTheDocument();
    expect(screen.getByText("09:00")).toBeInTheDocument();
    expect(screen.getByText("Opening Keynote")).toBeInTheDocument();
  });

  it("shows every session for a speaker with more than one", () => {
    const speaker: SpeakerSessions = {
      speaker: "Marta Fernandez",
      sessions: [
        session({ id: "opening-keynote", title: "Opening Keynote" }),
        session({
          id: "closing-panel",
          title: "Closing Panel",
          startTime: "16:30",
        }),
      ],
    };

    render(<SpeakerCard speaker={speaker} />);

    expect(screen.getByText("Opening Keynote")).toBeInTheDocument();
    expect(screen.getByText("Closing Panel")).toBeInTheDocument();
  });

  it("links each session to its session page", () => {
    const speaker: SpeakerSessions = {
      speaker: "Marta Fernandez",
      sessions: [session({ id: "opening-keynote" })],
    };

    render(<SpeakerCard speaker={speaker} />);

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/en/sessions/opening-keynote",
    );
  });
});
