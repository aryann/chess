import { assert, describe, it } from "vitest";
import { BoardState } from "./board";
import { MoveGenerator } from "./moves";

const make = (board: string, castlingRights?: string) => {
  if (!castlingRights) {
    castlingRights = "KQkq";
  }
  return new MoveGenerator(
    new BoardState(`${board} w ${castlingRights} - 0 1`)
  );
};

describe("pawns", () => {
  it("initial state", () => {
    const generator = make("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");

    assert.sameDeepMembers(generator.generateMoves("a2"), [
      { type: "normal", from: "a2", to: "a3" },
      { type: "normal", from: "a2", to: "a4" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("b2"), [
      { type: "normal", from: "b2", to: "b3" },
      { type: "normal", from: "b2", to: "b4" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("c2"), [
      { type: "normal", from: "c2", to: "c3" },
      { type: "normal", from: "c2", to: "c4" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("d2"), [
      { type: "normal", from: "d2", to: "d3" },
      { type: "normal", from: "d2", to: "d4" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("e2"), [
      { type: "normal", from: "e2", to: "e3" },
      { type: "normal", from: "e2", to: "e4" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("f2"), [
      { type: "normal", from: "f2", to: "f3" },
      { type: "normal", from: "f2", to: "f4" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("g2"), [
      { type: "normal", from: "g2", to: "g3" },
      { type: "normal", from: "g2", to: "g4" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("h2"), [
      { type: "normal", from: "h2", to: "h3" },
      { type: "normal", from: "h2", to: "h4" },
    ]);

    assert.sameDeepMembers(generator.generateMoves("a7"), [
      { type: "normal", from: "a7", to: "a6" },
      { type: "normal", from: "a7", to: "a5" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("b7"), [
      { type: "normal", from: "b7", to: "b6" },
      { type: "normal", from: "b7", to: "b5" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("c7"), [
      { type: "normal", from: "c7", to: "c6" },
      { type: "normal", from: "c7", to: "c5" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("d7"), [
      { type: "normal", from: "d7", to: "d6" },
      { type: "normal", from: "d7", to: "d5" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("e7"), [
      { type: "normal", from: "e7", to: "e6" },
      { type: "normal", from: "e7", to: "e5" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("f7"), [
      { type: "normal", from: "f7", to: "f6" },
      { type: "normal", from: "f7", to: "f5" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("g7"), [
      { type: "normal", from: "g7", to: "g6" },
      { type: "normal", from: "g7", to: "g5" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("h7"), [
      { type: "normal", from: "h7", to: "h6" },
      { type: "normal", from: "h7", to: "h5" },
    ]);
  });

  it("all black pawns on rank 3", () => {
    const generator = make("rnbqkbnr/8/8/8/8/pppppppp/PPPPPPPP/RNBQKBNR");

    assert.sameDeepMembers(generator.generateMoves("a2"), [
      { type: "normal", from: "a2", to: "b3" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("b2"), [
      { type: "normal", from: "b2", to: "a3" },
      { type: "normal", from: "b2", to: "c3" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("c2"), [
      { type: "normal", from: "c2", to: "b3" },
      { type: "normal", from: "c2", to: "d3" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("d2"), [
      { type: "normal", from: "d2", to: "c3" },
      { type: "normal", from: "d2", to: "e3" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("e2"), [
      { type: "normal", from: "e2", to: "d3" },
      { type: "normal", from: "e2", to: "f3" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("f2"), [
      { type: "normal", from: "f2", to: "e3" },
      { type: "normal", from: "f2", to: "g3" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("g2"), [
      { type: "normal", from: "g2", to: "f3" },
      { type: "normal", from: "g2", to: "h3" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("h2"), [
      { type: "normal", from: "h2", to: "g3" },
    ]);

    assert.sameDeepMembers(generator.generateMoves("a3"), [
      { type: "normal", from: "a3", to: "b2" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("b3"), [
      { type: "normal", from: "b3", to: "a2" },
      { type: "normal", from: "b3", to: "c2" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("c3"), [
      { type: "normal", from: "c3", to: "b2" },
      { type: "normal", from: "c3", to: "d2" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("d3"), [
      { type: "normal", from: "d3", to: "c2" },
      { type: "normal", from: "d3", to: "e2" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("e3"), [
      { type: "normal", from: "e3", to: "d2" },
      { type: "normal", from: "e3", to: "f2" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("f3"), [
      { type: "normal", from: "f3", to: "e2" },
      { type: "normal", from: "f3", to: "g2" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("g3"), [
      { type: "normal", from: "g3", to: "f2" },
      { type: "normal", from: "g3", to: "h2" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("h3"), [
      { type: "normal", from: "h3", to: "g2" },
    ]);
  });

  it("all white pawns on rank 6", () => {
    const generator = make("rnbqkbnr/pppppppp/PPPPPPPP/8/8/8/8/RNBQKBNR");

    assert.sameDeepMembers(generator.generateMoves("a7"), [
      { type: "normal", from: "a7", to: "b6" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("b7"), [
      { type: "normal", from: "b7", to: "a6" },
      { type: "normal", from: "b7", to: "c6" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("c7"), [
      { type: "normal", from: "c7", to: "b6" },
      { type: "normal", from: "c7", to: "d6" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("d7"), [
      { type: "normal", from: "d7", to: "c6" },
      { type: "normal", from: "d7", to: "e6" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("e7"), [
      { type: "normal", from: "e7", to: "d6" },
      { type: "normal", from: "e7", to: "f6" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("f7"), [
      { type: "normal", from: "f7", to: "e6" },
      { type: "normal", from: "f7", to: "g6" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("g7"), [
      { type: "normal", from: "g7", to: "f6" },
      { type: "normal", from: "g7", to: "h6" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("h7"), [
      { type: "normal", from: "h7", to: "g6" },
    ]);

    assert.sameDeepMembers(generator.generateMoves("a6"), [
      { type: "normal", from: "a6", to: "b7" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("b6"), [
      { type: "normal", from: "b6", to: "a7" },
      { type: "normal", from: "b6", to: "c7" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("c6"), [
      { type: "normal", from: "c6", to: "b7" },
      { type: "normal", from: "c6", to: "d7" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("d6"), [
      { type: "normal", from: "d6", to: "c7" },
      { type: "normal", from: "d6", to: "e7" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("e6"), [
      { type: "normal", from: "e6", to: "d7" },
      { type: "normal", from: "e6", to: "f7" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("f6"), [
      { type: "normal", from: "f6", to: "e7" },
      { type: "normal", from: "f6", to: "g7" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("g6"), [
      { type: "normal", from: "g6", to: "f7" },
      { type: "normal", from: "g6", to: "h7" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("h6"), [
      { type: "normal", from: "h6", to: "g7" },
    ]);
  });

  it("all black pawns on rank 4", () => {
    const generator = make("rnbqkbnr/8/8/8/pppppppp/8/PPPPPPPP/RNBQKBNR");

    assert.sameDeepMembers(generator.generateMoves("a2"), [
      { type: "normal", from: "a2", to: "a3" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("b2"), [
      { type: "normal", from: "b2", to: "b3" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("c2"), [
      { type: "normal", from: "c2", to: "c3" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("d2"), [
      { type: "normal", from: "d2", to: "d3" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("e2"), [
      { type: "normal", from: "e2", to: "e3" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("f2"), [
      { type: "normal", from: "f2", to: "f3" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("g2"), [
      { type: "normal", from: "g2", to: "g3" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("h2"), [
      { type: "normal", from: "h2", to: "h3" },
    ]);
  });

  it("promotions without captures", () => {
    const generator = make("8/3P4/8/8/8/8/4p3/8");

    assert.sameDeepMembers(generator.generateMoves("d7"), [
      {
        type: "promotion",
        from: "d7",
        to: "d8",
        promoteTo: "Q",
      },
      {
        type: "promotion",
        from: "d7",
        to: "d8",
        promoteTo: "R",
      },
      {
        type: "promotion",
        from: "d7",
        to: "d8",
        promoteTo: "B",
      },
      {
        type: "promotion",
        from: "d7",
        to: "d8",
        promoteTo: "N",
      },
    ]);

    assert.sameDeepMembers(generator.generateMoves("e2"), [
      {
        type: "promotion",
        from: "e2",
        to: "e1",
        promoteTo: "q",
      },
      {
        type: "promotion",
        from: "e2",
        to: "e1",
        promoteTo: "r",
      },
      {
        type: "promotion",
        from: "e2",
        to: "e1",
        promoteTo: "b",
      },
      {
        type: "promotion",
        from: "e2",
        to: "e1",
        promoteTo: "n",
      },
    ]);
  });

  it("promotions with captures", () => {
    const generator = make("2b1b3/3P4/8/8/8/8/4p3/3B1B2");

    assert.sameDeepMembers(generator.generateMoves("d7"), [
      {
        type: "promotion",
        from: "d7",
        to: "d8",
        promoteTo: "Q",
      },
      {
        type: "promotion",
        from: "d7",
        to: "d8",
        promoteTo: "R",
      },
      {
        type: "promotion",
        from: "d7",
        to: "d8",
        promoteTo: "B",
      },
      {
        type: "promotion",
        from: "d7",
        to: "d8",
        promoteTo: "N",
      },
      {
        type: "promotion",
        from: "d7",
        to: "e8",
        promoteTo: "Q",
      },
      {
        type: "promotion",
        from: "d7",
        to: "e8",
        promoteTo: "R",
      },
      {
        type: "promotion",
        from: "d7",
        to: "e8",
        promoteTo: "B",
      },
      {
        type: "promotion",
        from: "d7",
        to: "e8",
        promoteTo: "N",
      },
      {
        type: "promotion",
        from: "d7",
        to: "c8",
        promoteTo: "Q",
      },
      {
        type: "promotion",
        from: "d7",
        to: "c8",
        promoteTo: "R",
      },
      {
        type: "promotion",
        from: "d7",
        to: "c8",
        promoteTo: "B",
      },
      {
        type: "promotion",
        from: "d7",
        to: "c8",
        promoteTo: "N",
      },
    ]);

    assert.sameDeepMembers(generator.generateMoves("e2"), [
      {
        type: "promotion",
        from: "e2",
        to: "e1",
        promoteTo: "q",
      },
      {
        type: "promotion",
        from: "e2",
        to: "e1",
        promoteTo: "r",
      },
      {
        type: "promotion",
        from: "e2",
        to: "e1",
        promoteTo: "b",
      },
      {
        type: "promotion",
        from: "e2",
        to: "e1",
        promoteTo: "n",
      },
      {
        type: "promotion",
        from: "e2",
        promoteTo: "q",
        to: "d1",
      },
      {
        type: "promotion",
        from: "e2",
        to: "d1",
        promoteTo: "r",
      },
      {
        type: "promotion",
        from: "e2",
        to: "d1",
        promoteTo: "b",
      },
      {
        type: "promotion",
        from: "e2",
        to: "d1",
        promoteTo: "n",
      },
      {
        type: "promotion",
        from: "e2",
        to: "f1",
        promoteTo: "q",
      },
      {
        type: "promotion",
        from: "e2",
        to: "f1",
        promoteTo: "r",
      },
      {
        type: "promotion",
        from: "e2",
        to: "f1",
        promoteTo: "b",
      },
      {
        type: "promotion",
        from: "e2",
        to: "f1",
        promoteTo: "n",
      },
    ]);
  });

  it("white en passant", () => {
    const generator = new MoveGenerator(
      new BoardState(
        "rnbqkbnr/pppp1ppp/8/3PpP2/8/8/PPP1P1PP/RNBQKBNR w KQkq e6 0 2"
      )
    );

    assert.sameDeepMembers(generator.generateMoves("d5"), [
      {
        from: "d5",
        to: "d6",
        type: "normal",
      },
      {
        from: "d5",
        to: "e6",
        type: "enPassant",
      },
    ]);

    assert.sameDeepMembers(generator.generateMoves("f5"), [
      {
        from: "f5",
        to: "f6",
        type: "normal",
      },
      {
        from: "f5",
        to: "e6",
        type: "enPassant",
      },
    ]);
  });

  it("black en passant", () => {
    const generator = new MoveGenerator(
      new BoardState(
        "rnbqkbnr/pp1p1ppp/8/8/3pPp2/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"
      )
    );

    assert.sameDeepMembers(generator.generateMoves("d4"), [
      {
        from: "d4",
        to: "d3",
        type: "normal",
      },
      {
        from: "d4",
        to: "e3",
        type: "enPassant",
      },
    ]);

    assert.sameDeepMembers(generator.generateMoves("f4"), [
      {
        from: "f4",
        to: "f3",
        type: "normal",
      },
      {
        from: "f4",
        to: "e3",
        type: "enPassant",
      },
    ]);
  });
});

describe("queens", () => {
  it("initial state", () => {
    const generator = make("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
    assert.sameDeepMembers(generator.generateMoves("d1"), []);
    assert.sameDeepMembers(generator.generateMoves("d8"), []);
  });

  it("from corner", () => {
    const generator = make("Q7/8/8/8/8/8/8/8");

    assert.sameDeepMembers(generator.generateMoves("a8"), [
      { type: "normal", from: "a8", to: "b8" },
      { type: "normal", from: "a8", to: "c8" },
      { type: "normal", from: "a8", to: "d8" },
      { type: "normal", from: "a8", to: "e8" },
      { type: "normal", from: "a8", to: "f8" },
      { type: "normal", from: "a8", to: "g8" },
      { type: "normal", from: "a8", to: "h8" },
      { type: "normal", from: "a8", to: "b7" },
      { type: "normal", from: "a8", to: "c6" },
      { type: "normal", from: "a8", to: "d5" },
      { type: "normal", from: "a8", to: "e4" },
      { type: "normal", from: "a8", to: "f3" },
      { type: "normal", from: "a8", to: "g2" },
      { type: "normal", from: "a8", to: "h1" },
      { type: "normal", from: "a8", to: "a7" },
      { type: "normal", from: "a8", to: "a6" },
      { type: "normal", from: "a8", to: "a5" },
      { type: "normal", from: "a8", to: "a4" },
      { type: "normal", from: "a8", to: "a3" },
      { type: "normal", from: "a8", to: "a2" },
      { type: "normal", from: "a8", to: "a1" },
    ]);
  });

  it("from center", () => {
    const generator = make("8/8/8/3q4/8/8/8/8");

    assert.sameDeepMembers(generator.generateMoves("d5"), [
      { type: "normal", from: "d5", to: "d6" },
      { type: "normal", from: "d5", to: "d7" },
      { type: "normal", from: "d5", to: "d8" },
      { type: "normal", from: "d5", to: "e6" },
      { type: "normal", from: "d5", to: "f7" },
      { type: "normal", from: "d5", to: "g8" },
      { type: "normal", from: "d5", to: "e5" },
      { type: "normal", from: "d5", to: "f5" },
      { type: "normal", from: "d5", to: "g5" },
      { type: "normal", from: "d5", to: "h5" },
      { type: "normal", from: "d5", to: "e4" },
      { type: "normal", from: "d5", to: "f3" },
      { type: "normal", from: "d5", to: "g2" },
      { type: "normal", from: "d5", to: "h1" },
      { type: "normal", from: "d5", to: "d4" },
      { type: "normal", from: "d5", to: "d3" },
      { type: "normal", from: "d5", to: "d2" },
      { type: "normal", from: "d5", to: "d1" },
      { type: "normal", from: "d5", to: "c4" },
      { type: "normal", from: "d5", to: "b3" },
      { type: "normal", from: "d5", to: "a2" },
      { type: "normal", from: "d5", to: "c5" },
      { type: "normal", from: "d5", to: "b5" },
      { type: "normal", from: "d5", to: "a5" },
      { type: "normal", from: "d5", to: "c6" },
      { type: "normal", from: "d5", to: "b7" },
      { type: "normal", from: "d5", to: "a8" },
    ]);
  });

  it("from center with adjacent friendly pieces", () => {
    const generator = make("8/8/8/2rqr3/8/8/8/8");

    assert.sameDeepMembers(generator.generateMoves("d5"), [
      { type: "normal", from: "d5", to: "d6" },
      { type: "normal", from: "d5", to: "d7" },
      { type: "normal", from: "d5", to: "d8" },
      { type: "normal", from: "d5", to: "e6" },
      { type: "normal", from: "d5", to: "f7" },
      { type: "normal", from: "d5", to: "g8" },
      { type: "normal", from: "d5", to: "e4" },
      { type: "normal", from: "d5", to: "f3" },
      { type: "normal", from: "d5", to: "g2" },
      { type: "normal", from: "d5", to: "h1" },
      { type: "normal", from: "d5", to: "d4" },
      { type: "normal", from: "d5", to: "d3" },
      { type: "normal", from: "d5", to: "d2" },
      { type: "normal", from: "d5", to: "d1" },
      { type: "normal", from: "d5", to: "c4" },
      { type: "normal", from: "d5", to: "b3" },
      { type: "normal", from: "d5", to: "a2" },
      { type: "normal", from: "d5", to: "c6" },
      { type: "normal", from: "d5", to: "b7" },
      { type: "normal", from: "d5", to: "a8" },
    ]);
  });

  it("from center with adjacent opposite pieces", () => {
    const generator = make("8/8/8/2RqR3/8/8/8/8");

    assert.sameDeepMembers(generator.generateMoves("d5"), [
      { type: "normal", from: "d5", to: "d6" },
      { type: "normal", from: "d5", to: "d7" },
      { type: "normal", from: "d5", to: "d8" },
      { type: "normal", from: "d5", to: "e6" },
      { type: "normal", from: "d5", to: "f7" },
      { type: "normal", from: "d5", to: "g8" },
      { type: "normal", from: "d5", to: "e5" },
      { type: "normal", from: "d5", to: "e4" },
      { type: "normal", from: "d5", to: "f3" },
      { type: "normal", from: "d5", to: "g2" },
      { type: "normal", from: "d5", to: "h1" },
      { type: "normal", from: "d5", to: "d4" },
      { type: "normal", from: "d5", to: "d3" },
      { type: "normal", from: "d5", to: "d2" },
      { type: "normal", from: "d5", to: "d1" },
      { type: "normal", from: "d5", to: "c4" },
      { type: "normal", from: "d5", to: "b3" },
      { type: "normal", from: "d5", to: "a2" },
      { type: "normal", from: "d5", to: "c5" },
      { type: "normal", from: "d5", to: "c6" },
      { type: "normal", from: "d5", to: "b7" },
      { type: "normal", from: "d5", to: "a8" },
    ]);
  });
});

describe("bishops", () => {
  it("initial state", () => {
    const generator = make("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");

    assert.sameDeepMembers(generator.generateMoves("c1"), []);
    assert.sameDeepMembers(generator.generateMoves("f1"), []);
    assert.sameDeepMembers(generator.generateMoves("c8"), []);
    assert.sameDeepMembers(generator.generateMoves("f8"), []);
  });

  it("from corner", () => {
    const generator = make("b7/8/8/8/8/8/8/8");

    assert.sameDeepMembers(generator.generateMoves("a8"), [
      { type: "normal", from: "a8", to: "b7" },
      { type: "normal", from: "a8", to: "c6" },
      { type: "normal", from: "a8", to: "d5" },
      { type: "normal", from: "a8", to: "e4" },
      { type: "normal", from: "a8", to: "f3" },
      { type: "normal", from: "a8", to: "g2" },
      { type: "normal", from: "a8", to: "h1" },
    ]);
  });

  it("from center", () => {
    const generator = make("8/8/8/3B4/8/8/8/8");

    assert.sameDeepMembers(generator.generateMoves("d5"), [
      { type: "normal", from: "d5", to: "e6" },
      { type: "normal", from: "d5", to: "f7" },
      { type: "normal", from: "d5", to: "g8" },
      { type: "normal", from: "d5", to: "e4" },
      { type: "normal", from: "d5", to: "f3" },
      { type: "normal", from: "d5", to: "g2" },
      { type: "normal", from: "d5", to: "h1" },
      { type: "normal", from: "d5", to: "c4" },
      { type: "normal", from: "d5", to: "b3" },
      { type: "normal", from: "d5", to: "a2" },
      { type: "normal", from: "d5", to: "c6" },
      { type: "normal", from: "d5", to: "b7" },
      { type: "normal", from: "d5", to: "a8" },
    ]);
  });

  it("from center with adjacent friendly pieces", () => {
    const generator = make("8/8/2p5/3b4/4p3/8/8/8");

    assert.sameDeepMembers(generator.generateMoves("d5"), [
      { type: "normal", from: "d5", to: "e6" },
      { type: "normal", from: "d5", to: "f7" },
      { type: "normal", from: "d5", to: "g8" },
      { type: "normal", from: "d5", to: "c4" },
      { type: "normal", from: "d5", to: "b3" },
      { type: "normal", from: "d5", to: "a2" },
    ]);
  });

  it("from center with adjacent opposite pieces", () => {
    const generator = make("8/8/2P5/3b4/4P3/8/8/8");

    assert.sameDeepMembers(generator.generateMoves("d5"), [
      { type: "normal", from: "d5", to: "e6" },
      { type: "normal", from: "d5", to: "f7" },
      { type: "normal", from: "d5", to: "g8" },
      { type: "normal", from: "d5", to: "e4" },
      { type: "normal", from: "d5", to: "c4" },
      { type: "normal", from: "d5", to: "b3" },
      { type: "normal", from: "d5", to: "a2" },
      { type: "normal", from: "d5", to: "c6" },
    ]);
  });
});

describe("rooks", () => {
  it("initial state", () => {
    const generator = make("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");

    assert.sameDeepMembers(generator.generateMoves("a1"), []);
    assert.sameDeepMembers(generator.generateMoves("h1"), []);
    assert.sameDeepMembers(generator.generateMoves("a8"), []);
    assert.sameDeepMembers(generator.generateMoves("h8"), []);
  });

  it("from corner", () => {
    const generator = make("r7/8/8/8/8/8/8/8");

    assert.sameDeepMembers(generator.generateMoves("a8"), [
      { type: "normal", from: "a8", to: "b8" },
      { type: "normal", from: "a8", to: "c8" },
      { type: "normal", from: "a8", to: "d8" },
      { type: "normal", from: "a8", to: "e8" },
      { type: "normal", from: "a8", to: "f8" },
      { type: "normal", from: "a8", to: "g8" },
      { type: "normal", from: "a8", to: "h8" },
      { type: "normal", from: "a8", to: "a7" },
      { type: "normal", from: "a8", to: "a6" },
      { type: "normal", from: "a8", to: "a5" },
      { type: "normal", from: "a8", to: "a4" },
      { type: "normal", from: "a8", to: "a3" },
      { type: "normal", from: "a8", to: "a2" },
      { type: "normal", from: "a8", to: "a1" },
    ]);
  });

  it("from center", () => {
    const generator = make("8/8/8/3R4/8/8/8/8");

    assert.sameDeepMembers(generator.generateMoves("d5"), [
      { type: "normal", from: "d5", to: "d6" },
      { type: "normal", from: "d5", to: "d7" },
      { type: "normal", from: "d5", to: "d8" },
      { type: "normal", from: "d5", to: "e5" },
      { type: "normal", from: "d5", to: "f5" },
      { type: "normal", from: "d5", to: "g5" },
      { type: "normal", from: "d5", to: "h5" },
      { type: "normal", from: "d5", to: "d4" },
      { type: "normal", from: "d5", to: "d3" },
      { type: "normal", from: "d5", to: "d2" },
      { type: "normal", from: "d5", to: "d1" },
      { type: "normal", from: "d5", to: "c5" },
      { type: "normal", from: "d5", to: "b5" },
      { type: "normal", from: "d5", to: "a5" },
    ]);
  });

  it("from center with adjacent friendly pieces", () => {
    const generator = make("8/8/8/2prp3/8/8/8/8");

    assert.sameDeepMembers(generator.generateMoves("d5"), [
      { type: "normal", from: "d5", to: "d6" },
      { type: "normal", from: "d5", to: "d7" },
      { type: "normal", from: "d5", to: "d8" },
      { type: "normal", from: "d5", to: "d4" },
      { type: "normal", from: "d5", to: "d3" },
      { type: "normal", from: "d5", to: "d2" },
      { type: "normal", from: "d5", to: "d1" },
    ]);
  });

  it("from center with adjacent opposite pieces", () => {
    const generator = make("8/8/8/2PrP3/8/8/8/8");

    assert.sameDeepMembers(generator.generateMoves("d5"), [
      { type: "normal", from: "d5", to: "d6" },
      { type: "normal", from: "d5", to: "d7" },
      { type: "normal", from: "d5", to: "d8" },
      { type: "normal", from: "d5", to: "d4" },
      { type: "normal", from: "d5", to: "e5" },
      { type: "normal", from: "d5", to: "d3" },
      { type: "normal", from: "d5", to: "d2" },
      { type: "normal", from: "d5", to: "d1" },
      { type: "normal", from: "d5", to: "c5" },
    ]);
  });
});

describe("knights", () => {
  it("initial state", () => {
    const generator = make("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");

    assert.sameDeepMembers(generator.generateMoves("b1"), [
      { type: "normal", from: "b1", to: "a3" },
      { type: "normal", from: "b1", to: "c3" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("g1"), [
      { type: "normal", from: "g1", to: "f3" },
      { type: "normal", from: "g1", to: "h3" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("b8"), [
      { type: "normal", from: "b8", to: "a6" },
      { type: "normal", from: "b8", to: "c6" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("g8"), [
      { type: "normal", from: "g8", to: "f6" },
      { type: "normal", from: "g8", to: "h6" },
    ]);
  });

  it("white pawns on rank 3", () => {
    const generator = make("rnbqkbnr/8/pppppppp/8/8/PPPPPPPP/8/RNBQKBNR");

    assert.sameDeepMembers(generator.generateMoves("b1"), [
      { type: "normal", from: "b1", to: "d2" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("g1"), [
      { type: "normal", from: "g1", to: "e2" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("b8"), [
      { type: "normal", from: "b8", to: "d7" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("g8"), [
      { type: "normal", from: "g8", to: "e7" },
    ]);
  });

  it("from corners", () => {
    const generator = make("n7/8/8/8/8/8/8/7N");

    assert.sameDeepMembers(generator.generateMoves("a8"), [
      { type: "normal", from: "a8", to: "c7" },
      { type: "normal", from: "a8", to: "b6" },
    ]);
    assert.sameDeepMembers(generator.generateMoves("h1"), [
      { type: "normal", from: "h1", to: "f2" },
      { type: "normal", from: "h1", to: "g3" },
    ]);
  });

  it("from center", () => {
    const generator = make("8/8/8/3n4/8/8/8/8");

    assert.sameDeepMembers(generator.generateMoves("d5"), [
      { type: "normal", from: "d5", to: "e7" },
      { type: "normal", from: "d5", to: "f6" },
      { type: "normal", from: "d5", to: "f4" },
      { type: "normal", from: "d5", to: "e3" },
      { type: "normal", from: "d5", to: "c3" },
      { type: "normal", from: "d5", to: "b4" },
      { type: "normal", from: "d5", to: "b6" },
      { type: "normal", from: "d5", to: "c7" },
    ]);
  });

  it("from center with opposite pieces on destinations", () => {
    const generator = make("8/2p1p3/1p3p2/3N4/1p3p2/2p1p3/8/8");

    assert.sameDeepMembers(generator.generateMoves("d5"), [
      { type: "normal", from: "d5", to: "e7" },
      { type: "normal", from: "d5", to: "f6" },
      { type: "normal", from: "d5", to: "f4" },
      { type: "normal", from: "d5", to: "e3" },
      { type: "normal", from: "d5", to: "c3" },
      { type: "normal", from: "d5", to: "b4" },
      { type: "normal", from: "d5", to: "b6" },
      { type: "normal", from: "d5", to: "c7" },
    ]);
  });

  it("from center with friendly pieces on destinations", () => {
    const generator = make("8/2P1P3/1P3P2/3N4/1P3P2/2P1P3/8/8");

    assert.sameDeepMembers(generator.generateMoves("d5"), []);
  });

  it("from center with mix of pieces on destinations", () => {
    const generator = make("8/2p1p3/1p3p2/3N4/1P3P2/2P1P3/8/8");

    assert.sameDeepMembers(generator.generateMoves("d5"), [
      { type: "normal", from: "d5", to: "e7" },
      { type: "normal", from: "d5", to: "f6" },
      { type: "normal", from: "d5", to: "b6" },
      { type: "normal", from: "d5", to: "c7" },
    ]);
  });
});

describe("kings", () => {
  it("initial state", () => {
    const generator = make("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");

    assert.sameDeepMembers(generator.generateMoves("e1"), []);
    assert.sameDeepMembers(generator.generateMoves("e8"), []);
  });

  it("from corner", () => {
    const generator = make("K7/8/8/8/8/8/8/8");

    assert.sameDeepMembers(generator.generateMoves("a8"), [
      { type: "normal", from: "a8", to: "b8" },
      { type: "normal", from: "a8", to: "b7" },
      { type: "normal", from: "a8", to: "a7" },
    ]);
  });

  it("from center", () => {
    const generator = make("8/8/8/3k4/8/8/8/8");

    assert.sameDeepMembers(generator.generateMoves("d5"), [
      { type: "normal", from: "d5", to: "d4" },
      { type: "normal", from: "d5", to: "e4" },
      { type: "normal", from: "d5", to: "e5" },
      { type: "normal", from: "d5", to: "e6" },
      { type: "normal", from: "d5", to: "d6" },
      { type: "normal", from: "d5", to: "c6" },
      { type: "normal", from: "d5", to: "c5" },
      { type: "normal", from: "d5", to: "c4" },
    ]);
  });

  it("from center with adjacent friendly pieces", () => {
    const generator = make("8/8/8/2rkr3/8/8/8/8");

    assert.sameDeepMembers(generator.generateMoves("d5"), [
      { type: "normal", from: "d5", to: "d4" },
      { type: "normal", from: "d5", to: "e4" },
      { type: "normal", from: "d5", to: "e6" },
      { type: "normal", from: "d5", to: "d6" },
      { type: "normal", from: "d5", to: "c6" },
      { type: "normal", from: "d5", to: "c4" },
    ]);
  });

  it("from center with adjacent opposite pieces", () => {
    const generator = make("8/8/8/2RkR3/8/8/8/8");

    assert.sameDeepMembers(generator.generateMoves("d5"), [
      { type: "normal", from: "d5", to: "d4" },
      { type: "normal", from: "d5", to: "e4" },
      { type: "normal", from: "d5", to: "e5" },
      { type: "normal", from: "d5", to: "e6" },
      { type: "normal", from: "d5", to: "d6" },
      { type: "normal", from: "d5", to: "c6" },
      { type: "normal", from: "d5", to: "c5" },
      { type: "normal", from: "d5", to: "c4" },
    ]);
  });
});

describe("castling", () => {
  it("K with castling rights on both sides", () => {
    const generator = make("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/R3K2R", "KQkq");

    assert.sameDeepMembers(generator.generateMoves("e1"), [
      { type: "normal", from: "e1", to: "f1" },
      { type: "normal", from: "e1", to: "d1" },
      { type: "normal", from: "e1", to: "g1" },
      { type: "normal", from: "e1", to: "c1" },
    ]);
  });

  it("K with king-side castling rights only", () => {
    const generator = make("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/R3K2R", "K");

    assert.sameDeepMembers(generator.generateMoves("e1"), [
      { type: "normal", from: "e1", to: "f1" },
      { type: "normal", from: "e1", to: "d1" },
      { type: "normal", from: "e1", to: "g1" },
    ]);
  });

  it("K with queen-side castling rights only", () => {
    const generator = make("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/R3K2R", "Q");

    assert.sameDeepMembers(generator.generateMoves("e1"), [
      { type: "normal", from: "e1", to: "f1" },
      { type: "normal", from: "e1", to: "d1" },
      { type: "normal", from: "e1", to: "c1" },
    ]);
  });

  it("k with castling rights on both sides", () => {
    const generator = make("r3k2r/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR", "KQkq");

    assert.sameDeepMembers(generator.generateMoves("e8"), [
      { type: "normal", from: "e8", to: "f8" },
      { type: "normal", from: "e8", to: "d8" },
      { type: "normal", from: "e8", to: "g8" },
      { type: "normal", from: "e8", to: "c8" },
    ]);
  });

  it("k with king-side castling rights only", () => {
    const generator = make("r3k2r/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR", "k");

    assert.sameDeepMembers(generator.generateMoves("e8"), [
      { type: "normal", from: "e8", to: "f8" },
      { type: "normal", from: "e8", to: "d8" },
      { type: "normal", from: "e8", to: "g8" },
    ]);
  });

  it("k with queen-side castling rights only", () => {
    const generator = make("r3k2r/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR", "q");

    assert.sameDeepMembers(generator.generateMoves("e8"), [
      { type: "normal", from: "e8", to: "f8" },
      { type: "normal", from: "e8", to: "d8" },
      { type: "normal", from: "e8", to: "c8" },
    ]);
  });
});
