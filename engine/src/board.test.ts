import { assert, describe, expect, it } from "vitest";
import { BoardState } from "./board";

describe("board", () => {
  const board = new BoardState();

  it("initial state", () => {
    // Rank 1
    assert.equal(board.get("a1"), "R");
    assert.equal(board.get("b1"), "N");
    assert.equal(board.get("c1"), "B");
    assert.equal(board.get("d1"), "Q");
    assert.equal(board.get("e1"), "K");
    assert.equal(board.get("f1"), "B");
    assert.equal(board.get("g1"), "N");
    assert.equal(board.get("h1"), "R");

    // Rank 2
    assert.equal(board.get("a2"), "P");
    assert.equal(board.get("b2"), "P");
    assert.equal(board.get("c2"), "P");
    assert.equal(board.get("d2"), "P");
    assert.equal(board.get("e2"), "P");
    assert.equal(board.get("f2"), "P");
    assert.equal(board.get("g2"), "P");
    assert.equal(board.get("h2"), "P");

    // Rank 3
    assert.isUndefined(board.get("a3"));
    assert.isUndefined(board.get("b3"));
    assert.isUndefined(board.get("c3"));
    assert.isUndefined(board.get("d3"));
    assert.isUndefined(board.get("e3"));
    assert.isUndefined(board.get("f3"));
    assert.isUndefined(board.get("g3"));
    assert.isUndefined(board.get("h3"));

    // Rank 4
    assert.isUndefined(board.get("a4"));
    assert.isUndefined(board.get("b4"));
    assert.isUndefined(board.get("c4"));
    assert.isUndefined(board.get("d4"));
    assert.isUndefined(board.get("e4"));
    assert.isUndefined(board.get("f4"));
    assert.isUndefined(board.get("g4"));
    assert.isUndefined(board.get("h4"));

    // Rank 5
    assert.isUndefined(board.get("a5"));
    assert.isUndefined(board.get("b5"));
    assert.isUndefined(board.get("c5"));
    assert.isUndefined(board.get("d5"));
    assert.isUndefined(board.get("e5"));
    assert.isUndefined(board.get("f5"));
    assert.isUndefined(board.get("g5"));
    assert.isUndefined(board.get("h5"));

    // Rank 6
    assert.isUndefined(board.get("a6"));
    assert.isUndefined(board.get("b6"));
    assert.isUndefined(board.get("c6"));
    assert.isUndefined(board.get("d6"));
    assert.isUndefined(board.get("e6"));
    assert.isUndefined(board.get("f6"));
    assert.isUndefined(board.get("g6"));
    assert.isUndefined(board.get("h6"));

    // Rank 7
    assert.equal(board.get("a7"), "p");
    assert.equal(board.get("b7"), "p");
    assert.equal(board.get("c7"), "p");
    assert.equal(board.get("d7"), "p");
    assert.equal(board.get("e7"), "p");
    assert.equal(board.get("f7"), "p");
    assert.equal(board.get("g7"), "p");
    assert.equal(board.get("h7"), "p");

    // Rank 8
    assert.equal(board.get("a8"), "r");
    assert.equal(board.get("b8"), "n");
    assert.equal(board.get("c8"), "b");
    assert.equal(board.get("d8"), "q");
    assert.equal(board.get("e8"), "k");
    assert.equal(board.get("f8"), "b");
    assert.equal(board.get("g8"), "n");
    assert.equal(board.get("h8"), "r");
  });

  it("set", () => {
    board.set("a1", "p");
    assert.equal(board.get("a1"), "p");

    board.set("a8", "q");
    assert.equal(board.get("a8"), "q");

    board.set("e5", "Q");
    assert.equal(board.get("e5"), "Q");

    board.set("a8", "Q");
    assert.equal(board.get("a8"), "Q");

    board.set("h8", "Q");
    assert.equal(board.get("h8"), "Q");
  });

  it("clear", () => {
    board.clear("a1");
    assert.isUndefined(board.get("a1"));

    board.clear("a8");
    assert.isUndefined(board.get("a8"));

    board.clear("e5");
    assert.isUndefined(board.get("e5"));

    board.clear("a8");
    assert.isUndefined(board.get("a8"));

    board.clear("h8");
    assert.isUndefined(board.get("h8"));
  });
});

describe("from fen", () => {
  it("illegal values", () => {
    expect(() => new BoardState("invalid")).toThrowError(
      "Forsyth–Edwards Notation (FEN) must have six parts: invalid"
    );

    expect(
      () =>
        new BoardState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -")
    ).toThrowError(
      "Forsyth–Edwards Notation (FEN) must have six parts: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -"
    );

    expect(
      () =>
        new BoardState("rnbqkbnr/pppppppp/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    ).toThrowError(
      "Forsyth–Edwards Notation (FEN) must have eight ranks: rnbqkbnr/pppppppp/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    );
  });

  it("initial state", () => {
    const board = new BoardState(
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    );

    // Rank 1
    assert.equal(board.get("a1"), "R");
    assert.equal(board.get("b1"), "N");
    assert.equal(board.get("c1"), "B");
    assert.equal(board.get("d1"), "Q");
    assert.equal(board.get("e1"), "K");
    assert.equal(board.get("f1"), "B");
    assert.equal(board.get("g1"), "N");
    assert.equal(board.get("h1"), "R");

    // Rank 2
    assert.equal(board.get("a2"), "P");
    assert.equal(board.get("b2"), "P");
    assert.equal(board.get("c2"), "P");
    assert.equal(board.get("d2"), "P");
    assert.equal(board.get("e2"), "P");
    assert.equal(board.get("f2"), "P");
    assert.equal(board.get("g2"), "P");
    assert.equal(board.get("h2"), "P");

    // Rank 3
    assert.isUndefined(board.get("a3"));
    assert.isUndefined(board.get("b3"));
    assert.isUndefined(board.get("c3"));
    assert.isUndefined(board.get("d3"));
    assert.isUndefined(board.get("e3"));
    assert.isUndefined(board.get("f3"));
    assert.isUndefined(board.get("g3"));
    assert.isUndefined(board.get("h3"));

    // Rank 4
    assert.isUndefined(board.get("a4"));
    assert.isUndefined(board.get("b4"));
    assert.isUndefined(board.get("c4"));
    assert.isUndefined(board.get("d4"));
    assert.isUndefined(board.get("e4"));
    assert.isUndefined(board.get("f4"));
    assert.isUndefined(board.get("g4"));
    assert.isUndefined(board.get("h4"));

    // Rank 5
    assert.isUndefined(board.get("a5"));
    assert.isUndefined(board.get("b5"));
    assert.isUndefined(board.get("c5"));
    assert.isUndefined(board.get("d5"));
    assert.isUndefined(board.get("e5"));
    assert.isUndefined(board.get("f5"));
    assert.isUndefined(board.get("g5"));
    assert.isUndefined(board.get("h5"));

    // Rank 6
    assert.isUndefined(board.get("a6"));
    assert.isUndefined(board.get("b6"));
    assert.isUndefined(board.get("c6"));
    assert.isUndefined(board.get("d6"));
    assert.isUndefined(board.get("e6"));
    assert.isUndefined(board.get("f6"));
    assert.isUndefined(board.get("g6"));
    assert.isUndefined(board.get("h6"));

    // Rank 7
    assert.equal(board.get("a7"), "p");
    assert.equal(board.get("b7"), "p");
    assert.equal(board.get("c7"), "p");
    assert.equal(board.get("d7"), "p");
    assert.equal(board.get("e7"), "p");
    assert.equal(board.get("f7"), "p");
    assert.equal(board.get("g7"), "p");
    assert.equal(board.get("h7"), "p");

    // Rank 8
    assert.equal(board.get("a8"), "r");
    assert.equal(board.get("b8"), "n");
    assert.equal(board.get("c8"), "b");
    assert.equal(board.get("d8"), "q");
    assert.equal(board.get("e8"), "k");
    assert.equal(board.get("f8"), "b");
    assert.equal(board.get("g8"), "n");
    assert.equal(board.get("h8"), "r");
  });

  it("mid state", () => {
    const board = new BoardState("8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 40 40");

    // Rank 1
    assert.isUndefined(board.get("a1"));
    assert.isUndefined(board.get("b1"));
    assert.isUndefined(board.get("c1"));
    assert.isUndefined(board.get("d1"));
    assert.isUndefined(board.get("e1"));
    assert.isUndefined(board.get("f1"));
    assert.isUndefined(board.get("g1"));
    assert.isUndefined(board.get("h1"));

    // Rank 2
    assert.isUndefined(board.get("a2"));
    assert.isUndefined(board.get("b2"));
    assert.isUndefined(board.get("c2"));
    assert.isUndefined(board.get("d2"));
    assert.equal(board.get("e2"), "P");
    assert.isUndefined(board.get("f2"));
    assert.equal(board.get("g2"), "P");
    assert.isUndefined(board.get("h2"));

    // Rank 3
    assert.isUndefined(board.get("a3"));
    assert.isUndefined(board.get("b3"));
    assert.isUndefined(board.get("c3"));
    assert.isUndefined(board.get("d3"));
    assert.isUndefined(board.get("e3"));
    assert.isUndefined(board.get("f3"));
    assert.isUndefined(board.get("g3"));
    assert.isUndefined(board.get("h3"));

    // Rank 4
    assert.isUndefined(board.get("a4"));
    assert.equal(board.get("b4"), "R");
    assert.isUndefined(board.get("c4"));
    assert.isUndefined(board.get("d4"));
    assert.isUndefined(board.get("e4"));
    assert.equal(board.get("f4"), "p");
    assert.isUndefined(board.get("g4"));
    assert.equal(board.get("h4"), "k");

    // Rank 5
    assert.equal(board.get("a5"), "K");
    assert.equal(board.get("b5"), "P");
    assert.isUndefined(board.get("c5"));
    assert.isUndefined(board.get("d5"));
    assert.isUndefined(board.get("e5"));
    assert.isUndefined(board.get("f5"));
    assert.isUndefined(board.get("g5"));
    assert.equal(board.get("h5"), "r");

    // Rank 6
    assert.isUndefined(board.get("a6"));
    assert.isUndefined(board.get("b6"));
    assert.isUndefined(board.get("c6"));
    assert.equal(board.get("d6"), "p");
    assert.isUndefined(board.get("e6"));
    assert.isUndefined(board.get("f6"));
    assert.isUndefined(board.get("g6"));
    assert.isUndefined(board.get("h6"));

    // Rank 7
    assert.isUndefined(board.get("a7"));
    assert.isUndefined(board.get("b7"));
    assert.equal(board.get("c7"), "p");
    assert.isUndefined(board.get("d7"));
    assert.isUndefined(board.get("e7"));
    assert.isUndefined(board.get("f7"));
    assert.isUndefined(board.get("g7"));
    assert.isUndefined(board.get("h7"));

    // Rank 8
    assert.isUndefined(board.get("a8"));
    assert.isUndefined(board.get("b8"));
    assert.isUndefined(board.get("c8"));
    assert.isUndefined(board.get("d8"));
    assert.isUndefined(board.get("e8"));
    assert.isUndefined(board.get("f8"));
    assert.isUndefined(board.get("g8"));
    assert.isUndefined(board.get("h8"));
  });
});
