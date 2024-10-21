import { assert, describe, it } from "vitest";
import { BoardState } from "./board";
import { pins } from "./pins";

describe("pins", () => {
  it("initial state", () => {
    const board = new BoardState();

    assert.deepEqual(pins(board, "e1"), []);
  });

  it("adjacent rooks", () => {
    const board = new BoardState("8/3r4/3R4/3K4/3R4/3r4/8/8 w KQkq - 0 1");

    assert.deepEqual(pins(board, "d5"), ["d4", "d6"]);
  });

  it("far rooks", () => {
    const board = new BoardState("3r4/8/3R4/3K4/3R4/8/8/3r4 w KQkq - 0 1");

    assert.deepEqual(pins(board, "d5"), ["d4", "d6"]);
  });

  it("adjacent bishops", () => {
    const board = new BoardState("8/1b6/2R5/3K4/4R3/5b2/8/8 w KQkq - 0 1");

    assert.deepEqual(pins(board, "d5"), ["e4", "c6"]);
  });

  it("far bishops", () => {
    const board = new BoardState("K7/1R6/8/8/8/8/8/7b w KQkq - 0 1");

    assert.deepEqual(pins(board, "a8"), ["b7"]);
  });

  it("adjacent queens", () => {
    const board = new BoardState("8/3q4/3R4/3K4/3R4/3q4/8/8 w KQkq - 0 1");

    assert.deepEqual(pins(board, "d5"), ["d4", "d6"]);
  });

  it("far queen", () => {
    const board = new BoardState("K7/1R6/8/8/8/8/8/7q w KQkq - 0 1");

    assert.deepEqual(pins(board, "a8"), ["b7"]);
  });

  it("multiple defenders", () => {
    const board = new BoardState("3r4/3P4/3R4/3K4/3R4/3P4/8/3r4 w KQkq - 0 1");

    assert.deepEqual(pins(board, "d5"), ["d4", "d6"]);
  });
});
