import { describe, it, expect } from "vitest";

import * as HelperUtils from "../utils/helperUtils";

describe("numberUtils", () => {
  describe("formatThousands", () => {
    it("formats numbers with space as thousand separator", () => {
      expect(HelperUtils.formatThousands(171000).replace(/\u00A0/g, " ")).toBe(
        "171 000"
      );
    });

    it("handles string input", () => {
      expect(
        HelperUtils.formatThousands("1234567").replace(/\u00A0/g, " ")
      ).toBe("1 234 567");
    });

    it("returns '0' for empty input", () => {
      expect(HelperUtils.formatThousands("")).toBe("0");
    });

    it("returns '0' for null or undefined", () => {
      expect(HelperUtils.formatThousands(null)).toBe("0");
      expect(HelperUtils.formatThousands(undefined)).toBe("0");
    });
  });

  describe("generateUuidv4", () => {
    it("generates a valid UUIDv4 string format", () => {
      const uuid = HelperUtils.generateUuidv4();
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(uuidRegex.test(uuid)).toBe(true);
    });

    it("generates unique values", () => {
      const uuid1 = HelperUtils.generateUuidv4();
      const uuid2 = HelperUtils.generateUuidv4();
      expect(uuid1).not.toBe(uuid2);
    });
  });
});
