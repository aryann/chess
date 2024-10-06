import { assert, describe, it } from "vitest";
import { BoardState } from "./board";
import { MoveGenerator } from "./moves";

const make = (board: string) => {
  return new MoveGenerator(new BoardState(`${board} w KQkq - 0 1`));
};

describe("pawns", () => {
  it("initial state", () => {
    const generator = make("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");

    assert.sameDeepMembers(generator.generateMoves("a2"), ["a3", "a4"]);
    assert.sameDeepMembers(generator.generateMoves("b2"), ["b3", "b4"]);
    assert.sameDeepMembers(generator.generateMoves("c2"), ["c3", "c4"]);
    assert.sameDeepMembers(generator.generateMoves("d2"), ["d3", "d4"]);
    assert.sameDeepMembers(generator.generateMoves("e2"), ["e3", "e4"]);
    assert.sameDeepMembers(generator.generateMoves("f2"), ["f3", "f4"]);
    assert.sameDeepMembers(generator.generateMoves("g2"), ["g3", "g4"]);
    assert.sameDeepMembers(generator.generateMoves("h2"), ["h3", "h4"]);

    assert.sameDeepMembers(generator.generateMoves("a7"), ["a6", "a5"]);
    assert.sameDeepMembers(generator.generateMoves("b7"), ["b6", "b5"]);
    assert.sameDeepMembers(generator.generateMoves("c7"), ["c6", "c5"]);
    assert.sameDeepMembers(generator.generateMoves("d7"), ["d6", "d5"]);
    assert.sameDeepMembers(generator.generateMoves("e7"), ["e6", "e5"]);
    assert.sameDeepMembers(generator.generateMoves("f7"), ["f6", "f5"]);
    assert.sameDeepMembers(generator.generateMoves("g7"), ["g6", "g5"]);
    assert.sameDeepMembers(generator.generateMoves("h7"), ["h6", "h5"]);
  });

  it("all black pawns on rank 3", () => {
    const generator = make("rnbqkbnr/8/8/8/8/pppppppp/PPPPPPPP/RNBQKBNR");
    assert.sameDeepMembers(generator.generateMoves("a2"), ["b3"]);
    assert.sameDeepMembers(generator.generateMoves("b2"), ["a3", "c3"]);
    assert.sameDeepMembers(generator.generateMoves("c2"), ["b3", "d3"]);
    assert.sameDeepMembers(generator.generateMoves("d2"), ["c3", "e3"]);
    assert.sameDeepMembers(generator.generateMoves("e2"), ["d3", "f3"]);
    assert.sameDeepMembers(generator.generateMoves("f2"), ["e3", "g3"]);
    assert.sameDeepMembers(generator.generateMoves("g2"), ["f3", "h3"]);
    assert.sameDeepMembers(generator.generateMoves("h2"), ["g3"]);

    assert.sameDeepMembers(generator.generateMoves("a3"), ["b2"]);
    assert.sameDeepMembers(generator.generateMoves("b3"), ["a2", "c2"]);
    assert.sameDeepMembers(generator.generateMoves("c3"), ["b2", "d2"]);
    assert.sameDeepMembers(generator.generateMoves("d3"), ["c2", "e2"]);
    assert.sameDeepMembers(generator.generateMoves("e3"), ["d2", "f2"]);
    assert.sameDeepMembers(generator.generateMoves("f3"), ["e2", "g2"]);
    assert.sameDeepMembers(generator.generateMoves("g3"), ["f2", "h2"]);
    assert.sameDeepMembers(generator.generateMoves("h3"), ["g2"]);
  });

  it("all white pawns on rank 6", () => {
    const generator = make("rnbqkbnr/pppppppp/PPPPPPPP/8/8/8/8/RNBQKBNR");
    assert.sameDeepMembers(generator.generateMoves("a7"), ["b6"]);
    assert.sameDeepMembers(generator.generateMoves("b7"), ["a6", "c6"]);
    assert.sameDeepMembers(generator.generateMoves("c7"), ["b6", "d6"]);
    assert.sameDeepMembers(generator.generateMoves("d7"), ["c6", "e6"]);
    assert.sameDeepMembers(generator.generateMoves("e7"), ["d6", "f6"]);
    assert.sameDeepMembers(generator.generateMoves("f7"), ["e6", "g6"]);
    assert.sameDeepMembers(generator.generateMoves("g7"), ["f6", "h6"]);
    assert.sameDeepMembers(generator.generateMoves("h7"), ["g6"]);

    assert.sameDeepMembers(generator.generateMoves("a6"), ["b7"]);
    assert.sameDeepMembers(generator.generateMoves("b6"), ["a7", "c7"]);
    assert.sameDeepMembers(generator.generateMoves("c6"), ["b7", "d7"]);
    assert.sameDeepMembers(generator.generateMoves("d6"), ["c7", "e7"]);
    assert.sameDeepMembers(generator.generateMoves("e6"), ["d7", "f7"]);
    assert.sameDeepMembers(generator.generateMoves("f6"), ["e7", "g7"]);
    assert.sameDeepMembers(generator.generateMoves("g6"), ["f7", "h7"]);
    assert.sameDeepMembers(generator.generateMoves("h6"), ["g7"]);
  });

  it("all black pawns on rank 4", () => {
    const generator = make("rnbqkbnr/8/8/8/pppppppp/8/PPPPPPPP/RNBQKBNR");
    assert.sameDeepMembers(generator.generateMoves("a2"), ["a3"]);
    assert.sameDeepMembers(generator.generateMoves("b2"), ["b3"]);
    assert.sameDeepMembers(generator.generateMoves("c2"), ["c3"]);
    assert.sameDeepMembers(generator.generateMoves("d2"), ["d3"]);
    assert.sameDeepMembers(generator.generateMoves("e2"), ["e3"]);
    assert.sameDeepMembers(generator.generateMoves("f2"), ["f3"]);
    assert.sameDeepMembers(generator.generateMoves("g2"), ["g3"]);
    assert.sameDeepMembers(generator.generateMoves("h2"), ["h3"]);
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
      "b8",
      "c8",
      "d8",
      "e8",
      "f8",
      "g8",
      "h8",
      "b7",
      "c6",
      "d5",
      "e4",
      "f3",
      "g2",
      "h1",
      "a7",
      "a6",
      "a5",
      "a4",
      "a3",
      "a2",
      "a1",
    ]);
  });

  it("from center", () => {
    const generator = make("8/8/8/3q4/8/8/8/8");
    assert.sameDeepMembers(generator.generateMoves("d5"), [
      "d6",
      "d7",
      "d8",
      "e6",
      "f7",
      "g8",
      "e5",
      "f5",
      "g5",
      "h5",
      "e4",
      "f3",
      "g2",
      "h1",
      "d4",
      "d3",
      "d2",
      "d1",
      "c4",
      "b3",
      "a2",
      "c5",
      "b5",
      "a5",
      "c6",
      "b7",
      "a8",
    ]);
  });

  it("from center with adjacent friendly pieces", () => {
    const generator = make("8/8/8/2rqr3/8/8/8/8");
    assert.sameDeepMembers(generator.generateMoves("d5"), [
      "d6",
      "d7",
      "d8",
      "e6",
      "f7",
      "g8",
      "e4",
      "f3",
      "g2",
      "h1",
      "d4",
      "d3",
      "d2",
      "d1",
      "c4",
      "b3",
      "a2",
      "c6",
      "b7",
      "a8",
    ]);
  });

  it("from center with adjacent opposite pieces", () => {
    const generator = make("8/8/8/2RqR3/8/8/8/8");
    assert.sameDeepMembers(generator.generateMoves("d5"), [
      "d6",
      "d7",
      "d8",
      "e6",
      "f7",
      "g8",
      "e5",
      "e4",
      "f3",
      "g2",
      "h1",
      "d4",
      "d3",
      "d2",
      "d1",
      "c4",
      "b3",
      "a2",
      "c5",
      "c6",
      "b7",
      "a8",
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
      "b7",
      "c6",
      "d5",
      "e4",
      "f3",
      "g2",
      "h1",
    ]);
  });

  it("from center", () => {
    const generator = make("8/8/8/3B4/8/8/8/8");
    assert.sameDeepMembers(generator.generateMoves("d5"), [
      "e6",
      "f7",
      "g8",
      "e4",
      "f3",
      "g2",
      "h1",
      "c4",
      "b3",
      "a2",
      "c6",
      "b7",
      "a8",
    ]);
  });

  it("from center with adjacent friendly pieces", () => {
    const generator = make("8/8/2p5/3b4/4p3/8/8/8");
    assert.sameDeepMembers(generator.generateMoves("d5"), [
      "e6",
      "f7",
      "g8",
      "c4",
      "b3",
      "a2",
    ]);
  });

  it("from center with adjacent opposite pieces", () => {
    const generator = make("8/8/2P5/3b4/4P3/8/8/8");
    assert.sameDeepMembers(generator.generateMoves("d5"), [
      "e6",
      "f7",
      "g8",
      "e4",
      "c4",
      "b3",
      "a2",
      "c6",
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
      "b8",
      "c8",
      "d8",
      "e8",
      "f8",
      "g8",
      "h8",
      "a7",
      "a6",
      "a5",
      "a4",
      "a3",
      "a2",
      "a1",
    ]);
  });

  it("from center", () => {
    const generator = make("8/8/8/3R4/8/8/8/8");
    assert.sameDeepMembers(generator.generateMoves("d5"), [
      "d6",
      "d7",
      "d8",
      "e5",
      "f5",
      "g5",
      "h5",
      "d4",
      "d3",
      "d2",
      "d1",
      "c5",
      "b5",
      "a5",
    ]);
  });

  it("from center with adjacent friendly pieces", () => {
    const generator = make("8/8/8/2prp3/8/8/8/8");
    assert.sameDeepMembers(generator.generateMoves("d5"), [
      "d6",
      "d7",
      "d8",
      "d4",
      "d3",
      "d2",
      "d1",
    ]);
  });

  it("from center with adjacent opposite pieces", () => {
    const generator = make("8/8/8/2PrP3/8/8/8/8");
    assert.sameDeepMembers(generator.generateMoves("d5"), [
      "d6",
      "d7",
      "d8",
      "d4",
      "e5",
      "d3",
      "d2",
      "d1",
      "c5",
    ]);
  });
});

describe("knights", () => {
  it("initial state", () => {
    const generator = make("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
    assert.sameDeepMembers(generator.generateMoves("b1"), ["a3", "c3"]);
    assert.sameDeepMembers(generator.generateMoves("g1"), ["f3", "h3"]);
    assert.sameDeepMembers(generator.generateMoves("b8"), ["a6", "c6"]);
    assert.sameDeepMembers(generator.generateMoves("g8"), ["f6", "h6"]);
  });

  it("white pawns on rank 3", () => {
    const generator = make("rnbqkbnr/8/pppppppp/8/8/PPPPPPPP/8/RNBQKBNR");
    assert.sameDeepMembers(generator.generateMoves("b1"), ["d2"]);
    assert.sameDeepMembers(generator.generateMoves("g1"), ["e2"]);
    assert.sameDeepMembers(generator.generateMoves("b8"), ["d7"]);
    assert.sameDeepMembers(generator.generateMoves("g8"), ["e7"]);
  });

  it("from corners", () => {
    const generator = make("n7/8/8/8/8/8/8/7N");
    assert.sameDeepMembers(generator.generateMoves("a8"), ["c7", "b6"]);
    assert.sameDeepMembers(generator.generateMoves("h1"), ["f2", "g3"]);
  });

  it("from center", () => {
    const generator = make("8/8/8/3n4/8/8/8/8");
    assert.sameDeepMembers(generator.generateMoves("d5"), [
      "e7",
      "f6",
      "f4",
      "e3",
      "c3",
      "b4",
      "b6",
      "c7",
    ]);
  });

  it("from center with opposite pieces on destinations", () => {
    const generator = make("8/2p1p3/1p3p2/3N4/1p3p2/2p1p3/8/8");
    assert.sameDeepMembers(generator.generateMoves("d5"), [
      "e7",
      "f6",
      "f4",
      "e3",
      "c3",
      "b4",
      "b6",
      "c7",
    ]);
  });

  it("from center with friendly pieces on destinations", () => {
    const generator = make("8/2P1P3/1P3P2/3N4/1P3P2/2P1P3/8/8");
    assert.sameDeepMembers(generator.generateMoves("d5"), []);
  });

  it("from center with mix of pieces on destinations", () => {
    const generator = make("8/2p1p3/1p3p2/3N4/1P3P2/2P1P3/8/8");
    assert.sameDeepMembers(generator.generateMoves("d5"), [
      "e7",
      "f6",
      "b6",
      "c7",
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
    assert.sameDeepMembers(generator.generateMoves("a8"), ["b8", "b7", "a7"]);
  });

  it("from center", () => {
    const generator = make("8/8/8/3k4/8/8/8/8");
    assert.sameDeepMembers(generator.generateMoves("d5"), [
      "d4",
      "e4",
      "e5",
      "e6",
      "d6",
      "c6",
      "c5",
      "c4",
    ]);
  });

  it("from center with adjacent friendly pieces", () => {
    const generator = make("8/8/8/2rkr3/8/8/8/8");
    assert.sameDeepMembers(generator.generateMoves("d5"), [
      "d4",
      "e4",
      "e6",
      "d6",
      "c6",
      "c4",
    ]);
  });

  it("from center with adjacent opposite pieces", () => {
    const generator = make("8/8/8/2RkR3/8/8/8/8");
    assert.sameDeepMembers(generator.generateMoves("d5"), [
      "d4",
      "e4",
      "e5",
      "e6",
      "d6",
      "c6",
      "c5",
      "c4",
    ]);
  });
});
