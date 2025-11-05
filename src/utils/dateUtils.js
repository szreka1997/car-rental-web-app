// Visszaad: -1 ha a < b, 0 ha egyenlő, +1 ha a > b
export function compareDatesIgnoringTime(a, b) {
  function toDateOnly(d) {
    const date = new Date(d);
    return new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
  }

  const da = toDateOnly(a);
  const db = toDateOnly(b);

  if (da < db) return -1;
  if (da > db) return 1;
  return 0;
}

export function getShortISOString(date) {
  return new Date(date).toISOString().split("T")[0];
}

export function daysBetween(d1, d2) {
  const date1 = new Date(d1);
  const date2 = new Date(d2);

  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return Math.round(diffDays);
}
