import { describe, expect, it } from "vitest";

import type { Level } from "@/types/session";

import en from "./en.json";
import es from "./es.json";

// Every value the session_level enum can take (types/session.ts, generated
// from the Postgres enum in supabase/migrations). Hardcoded here rather than
// derived from the type — a TS union can't be turned into a runtime array —
// so this list needs a matching update if the enum ever grows, same as the
// message keys it checks below.
const LEVELS: Level[] = ["beginner", "intermediate", "advanced"];

describe("SessionLevel translations", () => {
  it.each(LEVELS)("has an English label for '%s'", (level) => {
    expect(en.SessionLevel[level]).toBeTruthy();
  });

  it.each(LEVELS)("has a Spanish label for '%s'", (level) => {
    expect(es.SessionLevel[level]).toBeTruthy();
  });
});
