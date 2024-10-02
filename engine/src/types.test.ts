import { assert, describe, it } from "vitest";
import { getFile, getRank } from "./types";

describe("board", () => {
  it("file", () => {
    assert.equal(getFile("a1"), "a");
    assert.equal(getFile("e4"), "e");
    assert.equal(getFile("h8"), "h");
  });

  it("rank", () => {
    assert.equal(getRank("a1"), 1);
    assert.equal(getRank("e4"), 4);
    assert.equal(getRank("h8"), 8);
  });
});
