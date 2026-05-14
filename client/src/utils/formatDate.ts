type DateStyle = NonNullable<Intl.DateTimeFormatOptions["dateStyle"]>;
type WeekdayStyle = NonNullable<Intl.DateTimeFormatOptions["weekday"]>;

function parseDate(dateString?: string) {
  if (!dateString) {
    return null;
  }

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

export function formatDate(dateString?: string, dateStyle: DateStyle = "full") {
  const date = parseDate(dateString);
  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle,
  }).format(date);
}

export function formatWeekday(
  dateString?: string,
  weekday: WeekdayStyle = "short",
) {
  const date = parseDate(dateString);
  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("en-GB", {
    weekday,
  }).format(date);
}

export function formatTime(dateString?: string) {
  const date = parseDate(dateString);
  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}
