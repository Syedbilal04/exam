/**
 * Dates render identically on the server and in the browser: attempt
 * timestamps are built by hand rather than through Intl, whose short month
 * names differ between Node and browser ICU builds ("Sep" vs "Sept") and would
 * reintroduce a hydration mismatch. IST is a fixed +05:30 with no daylight
 * saving, so shifting the epoch and reading UTC parts is exact.
 */
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function istParts(iso: string) {
  const at = new Date(new Date(iso).getTime() + IST_OFFSET_MS);
  const hours = at.getUTCHours();

  return {
    day: String(at.getUTCDate()).padStart(2, "0"),
    month: MONTHS[at.getUTCMonth()],
    year: at.getUTCFullYear(),
    hour: String(hours % 12 || 12).padStart(2, "0"),
    minute: String(at.getUTCMinutes()).padStart(2, "0"),
    meridiem: hours < 12 ? "am" : "pm",
  };
}

export function formatDateTime(iso: string): string {
  const { day, month, year, hour, minute, meridiem } = istParts(iso);
  return `${day} ${month} ${year}, ${hour}:${minute} ${meridiem}`;
}

export function formatDate(iso: string): string {
  const { day, month, year } = istParts(iso);
  return `${day} ${month} ${year}`;
}
