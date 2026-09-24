import { describe, expect, it } from "vitest";

import { render, screen } from "@/tests/utils/render";
import type { Session } from "@/types/session";

import { SessionBlock } from "./session-block";

const session: Session = {
  id: "opening-keynote",
  title: "Opening Keynote",
  speaker: "Marta Fernandez",
  track: "React",
  room: "Main Hall",
  startTime: "09:00",
  durationMinutes: 45,
  description: "",
  level: "beginner",
};

describe("SessionBlock", () => {
  it("shows the title, the start time, the speaker and the level", () => {
    render(<SessionBlock session={session} top={0} height={72} />);

    expect(screen.getByText("Opening Keynote")).toBeInTheDocument();
    // The level is its own flexShrink="0" text node (see session-block.tsx)
    // so it can't be swallowed when the time/speaker text truncates — that
    // puts it in a separate element, hence the split assertion.
    expect(screen.getByText("09:00 · Marta Fernandez")).toBeInTheDocument();
    expect(screen.getByText("· Beginner")).toBeInTheDocument();
  });

  it("links to the session page", () => {
    render(<SessionBlock session={session} top={0} height={72} />);

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/en/sessions/opening-keynote",
    );
  });
});
