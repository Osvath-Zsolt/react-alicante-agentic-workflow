import type { Level } from "@/types/session";

/**
 * The `session_level` enum values, straight from the schema, are lowercase
 * (`"beginner"`, `"intermediate"`, `"advanced"`). Display wants them
 * capitalized — this is the one place that does it.
 */
export function formatLevel(level: Level): string {
  return level.charAt(0).toUpperCase() + level.slice(1);
}
