/**
 * Formats a number with thousand separators according to Hungarian locale.
 *
 * @param {number|string} num - The number to format.
 * @returns {string} - The formatted string, e.g. "171 000".
 */
export function formatThousands(num) {
  if (!num || num === "") return "0";
  return Number(num).toLocaleString("hu-HU");
}

/**
 * Generates a UUID version 4 string using the crypto API.
 *
 * @returns {string} - A random UUIDv4 (e.g., "3fa85f64-5717-4562-b3fc-2c963f66afa6").
 */
export function generateUuidv4() {
  // Standard UUID v4 template, then replace specific bits with random values
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  );
}
