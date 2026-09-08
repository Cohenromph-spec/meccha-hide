/**
 * Single shared "what day is it" utility — used anywhere something is
 * scoped to a calendar day (daily reflection, daily puzzle, etc). Kept in
 * one place on purpose: two different day-boundary conventions (e.g. one
 * UTC-based, one local-time-based) computing "today" independently is
 * exactly the kind of mismatch that would make "today's puzzle" and "did
 * I finish today's puzzle" silently disagree near a day boundary.
 */
export function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

/** A stable integer seed derived from the same day string everything else uses. */
export function todaySeed() {
  return Number(todayStr().replaceAll('-', ''));
}
