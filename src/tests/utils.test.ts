import { generateId } from "@/lib/utils";
import { describe, expect, test } from "vitest";

describe("utils", () => {
  describe("generateId", () => {
    test("should generate an id of length 6", () => {
      const id = generateId();

      expect(id.length).toBe(6);
    });
  });
});
