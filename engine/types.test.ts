import { expect } from "jsr:@std/expect";
import { getFile, getRank } from "./types.ts";

Deno.test("board", async (t) => {
  await t.step("file", () => {
    expect(getFile("a1")).toBe("a");
    expect(getFile("e4")).toBe("e");
    expect(getFile("h8")).toBe("h");
  });

  await t.step("rank", () => {
    expect(getRank("a1")).toBe(1);
    expect(getRank("e4")).toBe(4);
    expect(getRank("h8")).toBe(8);
  });
});
