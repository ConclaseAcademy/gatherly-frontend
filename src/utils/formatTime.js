export function formatDisplayTime(value) {
  if (!value) return "";

  const text = String(value).trim();
  if (!text) return "";

  if (/^(?:[1-9]|1[0-2])\s*:\s*\d{2}\s*(am|pm)$/i.test(text)) {
    return text.replace(/\s+/g, " ").replace(/am/i, "AM").replace(/pm/i, "PM");
  }

  const match = text.match(/^(\d{1,2})(?::(\d{2})(?::(\d{2}))?)?\s*(am|pm)?$/i);
  if (!match) return text;

  let hour = Number(match[1]);
  const minute = match[2] || "00";
  const meridiem = (match[4] || "").toUpperCase();

  if (meridiem === "AM" && hour === 12) hour = 0;
  if (meridiem === "PM" && hour < 12) hour += 12;

  const date = new Date(1970, 0, 1, hour, Number(minute));

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
