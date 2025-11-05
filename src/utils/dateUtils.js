/**
 * Compare two dates ignoring the time portion.
 *
 * @param {Date | string} a - The first date.
 * @param {Date | string} b - The second date.
 * @returns {number} - Returns -1 if a < b, 1 if a > b, or 0 if equal.
 */
export function compareDatesIgnoringTime(a, b) {
  function toDateOnly(d) {
    const date = new Date(d);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  const da = toDateOnly(a);
  const db = toDateOnly(b);

  if (da < db) return -1;
  if (da > db) return 1;
  return 0;
}

/**
 * Returns a short ISO date string (YYYY-MM-DD) from any valid date.
 *
 * @param {Date | string} date - The input date.
 * @returns {string} - The date in YYYY-MM-DD format.
 */
export function getShortISOString(date) {
  return new Date(date).toISOString().split("T")[0];
}

/**
 * Calculates the number of full days between two dates (absolute value).
 *
 * @param {Date | string} d1 - The first date.
 * @param {Date | string} d2 - The second date.
 * @returns {number} - The number of days between the two dates.
 */
export function daysBetween(d1, d2) {
  const date1 = new Date(d1);
  const date2 = new Date(d2);

  const diffTime = Math.abs(date2 - date1);
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}
