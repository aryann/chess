import { assert, describe, it } from "vitest";
import { file, rank } from "./types";

describe("board", () => {
  it("file", () => {
    assert.equal(file("a1"), "a");
    assert.equal(file("e4"), "e");
    assert.equal(file("h8"), "h");
  });

  it("rank", () => {
    assert.equal(rank("a1"), 1);
    assert.equal(rank("e4"), 4);
    assert.equal(rank("h8"), 8);
  });
});
