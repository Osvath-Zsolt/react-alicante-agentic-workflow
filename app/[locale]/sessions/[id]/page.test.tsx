import { describe, expect, it, vi } from "vitest";

import messages from "@/messages/en.json";
import { render, screen } from "@/tests/utils/render";
import type { Session } from "@/types/session";

vi.mock("@/services/sessions", () => ({
  fetchSessionById: vi.fn(),
  fetchSessions: vi.fn(),
}));

// `getTranslations` (next-intl/server) needs the real Next.js RSC runtime to
// resolve its locale/messages context, which Vitest doesn't provide — it
// throws "not supported in Client Components" outside of one. Stand in with
// a lookup against the real en.json so a missing key still fails the test,
// same as `tests/utils/render`'s comment about the client-side provider.
vi.mock("next-intl/server", () => ({
  getTranslations: vi.fn(async (namespace: string) => {
    const dict = (messages as Record<string, Record<string, string>>)[
      namespace
    ];
    return (key: string) => {
      const value = dict?.[key];
      if (value === undefined) {
        throw new Error(`Missing message: ${namespace}.${key}`);
      }
      return value;
    };
  }),
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

  it("labels each badge for screen readers, not just visually", async () => {
    vi.mocked(fetchSessionById).mockResolvedValue(session);

    const ui = await SessionDetailPage({
      params: Promise.resolve({ id: session.id }),
    });
    render(ui);

    // Two adjacent badges with no label would read as one undifferentiated
    // string ("Agentic AI, Intermediate") to a screen reader. These sr-only
    // prefixes give each its own meaning without changing how it looks.
    expect(screen.getByText("Track:", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("Level:", { exact: false })).toBeInTheDocument();
  });
});
