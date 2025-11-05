import { describe, it, expect } from "vitest";

import * as DateUtils from "../utils/dateUtils";

describe("dateUtils", () => {
  describe("compareDatesIgnoringTime", () => {
    it("returns -1 when first date is earlier", () => {
      expect(
        DateUtils.compareDatesIgnoringTime("2025-01-01", "2025-01-02")
      ).toBe(-1);
    });

    it("returns 1 when first date is later", () => {
      expect(
        DateUtils.compareDatesIgnoringTime("2025-01-03", "2025-01-02")
      ).toBe(1);
    });

    it("returns 0 when dates are equal even with different times", () => {
      expect(
        DateUtils.compareDatesIgnoringTime(
          "2025-01-01T10:00:00",
          "2025-01-01T22:00:00"
        )
      ).toBe(0);
    });
  });

  describe("getShortISOString", () => {
    it("returns ISO date in YYYY-MM-DD format in case of datestring", () => {
      const result = DateUtils.getShortISOString("2025-03-15T12:34:56Z");
      expect(result).toBe("2025-03-15");
    });
    it("returns ISO date in YYYY-MM-DD format in case of Date", () => {
      const result = DateUtils.getShortISOString(new Date("2025-03-15"));
      expect(result).toBe("2025-03-15");
    });
  });

  describe("daysBetween", () => {
    it("returns correct number of days", () => {
      expect(DateUtils.daysBetween("2025-01-01", "2025-01-06")).toBe(5);
    });

    it("returns correct number of days across multiple months", () => {
      expect(DateUtils.daysBetween("2025-01-01", "2025-02-06")).toBe(36);
    });

    it("returns 0 for same day", () => {
      expect(DateUtils.daysBetween("2025-01-01", "2025-01-01")).toBe(0);
    });

    it("works regardless of order", () => {
      expect(DateUtils.daysBetween("2025-01-10", "2025-01-01")).toBe(9);
    });
  });
});
