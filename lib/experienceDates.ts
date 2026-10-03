// Months are "YYYY-MM" strings. Labels use fixed English abbreviations (not Intl) so the server
// render and the browser render always produce identical text.
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parse(value: string) {
  const [year, month] = value.split("-").map(Number);
  return { year, month: month - 1 };
}

export function formatMonth(value: string): string {
  const { year, month } = parse(value);
  return `${MONTHS[month]} ${year}`;
}

export function toYearMonth(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

// Calendar months the range touches, both ends included (Jan to Jul is 7), the way LinkedIn counts.
export function monthSpan(start: string, end: string): number {
  const a = parse(start);
  const b = parse(end);
  return (b.year - a.year) * 12 + (b.month - a.month) + 1;
}

export function formatDuration(months: number, style: "short" | "long" = "short"): string {
  const [year, years, month, monthsWord] =
    style === "long" ? ["year", "years", "month", "months"] : ["yr", "yrs", "mo", "mos"];
  const wholeYears = Math.floor(months / 12);
  const rest = months % 12;
  const parts: string[] = [];
  if (wholeYears > 0) parts.push(`${wholeYears} ${wholeYears === 1 ? year : years}`);
  if (rest > 0 || wholeYears === 0) parts.push(`${rest} ${rest === 1 ? month : monthsWord}`);
  return parts.join(" ");
}
