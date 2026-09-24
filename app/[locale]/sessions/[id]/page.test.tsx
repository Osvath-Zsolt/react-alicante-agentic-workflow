import { describe, expect, it, vi } from "vitest";

import { render, screen } from "@/tests/utils/render";
import type { Session } from "@/types/session";

vi.mock("@/services/sessions", () => ({
  fetchSessionById: vi.fn(),
  fetchSessions: vi.fn(),
}));

import { fetchSessionById } from "@/services/sessions";

import SessionDetailPage from "./page";

const session: Session = {
  id: "build-your-agentic-workflow",
  title: "Build Your Agentic Workflow",
  speaker: "Evangelia Mitsopoulou",
  track: "Agentic AI",
  room: "Workshop Room A",
  startTime: "09:45",
  durationMinutes: 180,
  description: "Hands-on workshop.",
  level: "intermediate",
};

describe("SessionDetailPage", () => {
  it("shows the level as a badge next to the track", async () => {
    vi.mocked(fetchSessionById).mockResolvedValue(session);

    const ui = await SessionDetailPage({
      params: Promise.resolve({ id: session.id }),
    });
    render(ui);

    expect(screen.getByText("Agentic AI")).toBeInTheDocument();
    expect(screen.getByText("Intermediate")).toBeInTheDocument();
  });
});
