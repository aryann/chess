import { assert, describe, it } from "vitest";
import { BoardState } from "./board";
import { MoveGenerator } from "./moves";

const make = (board: string) => {
  return new MoveGenerator(new BoardState(`${board} w KQkq - 0 1`));
};

describe("moves", () => {
  it("pawn", () => {
    let generator = make("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");

    // White pawns:
    assert.sameDeepMembers(generator.generateMoves("a2"), ["a3", "a4"]);
    assert.sameDeepMembers(generator.generateMoves("b2"), ["b3", "b4"]);
    assert.sameDeepMembers(generator.generateMoves("c2"), ["c3", "c4"]);
    assert.sameDeepMembers(generator.generateMoves("d2"), ["d3", "d4"]);
    assert.sameDeepMembers(generator.generateMoves("e2"), ["e3", "e4"]);
    assert.sameDeepMembers(generator.generateMoves("f2"), ["f3", "f4"]);
    assert.sameDeepMembers(generator.generateMoves("g2"), ["g3", "g4"]);
    assert.sameDeepMembers(generator.generateMoves("h2"), ["h3", "h4"]);

    // Black pawns:
    assert.sameDeepMembers(generator.generateMoves("a7"), ["a6", "a5"]);
    assert.sameDeepMembers(generator.generateMoves("b7"), ["b6", "b5"]);
    assert.sameDeepMembers(generator.generateMoves("c7"), ["c6", "c5"]);
    assert.sameDeepMembers(generator.generateMoves("d7"), ["d6", "d5"]);
    assert.sameDeepMembers(generator.generateMoves("e7"), ["e6", "e5"]);
    assert.sameDeepMembers(generator.generateMoves("f7"), ["f6", "f5"]);
    assert.sameDeepMembers(generator.generateMoves("g7"), ["g6", "g5"]);
    assert.sameDeepMembers(generator.generateMoves("h7"), ["h6", "h5"]);
  });

  it("queen", () => {
    let generator = make("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
    assert.sameDeepMembers(generator.generateMoves("d1"), []);
    assert.sameDeepMembers(generator.generateMoves("d8"), []);

    generator = make("Q7/8/8/8/8/8/8/8");
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

    generator = make("8/8/8/3q4/8/8/8/8");
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

    generator = make("8/8/8/2rqr3/8/8/8/8");
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

    generator = make("8/8/8/2RqR3/8/8/8/8");
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

  it("bishop", () => {
    let generator = make("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
    assert.sameDeepMembers(generator.generateMoves("c1"), []);
    assert.sameDeepMembers(generator.generateMoves("f1"), []);
    assert.sameDeepMembers(generator.generateMoves("c8"), []);
    assert.sameDeepMembers(generator.generateMoves("f8"), []);

    generator = make("b7/8/8/8/8/8/8/8");
    assert.sameDeepMembers(generator.generateMoves("a8"), [
      "b7",
      "c6",
      "d5",
      "e4",
      "f3",
      "g2",
      "h1",
    ]);

    generator = make("8/8/8/3B4/8/8/8/8");
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

    generator = make("8/8/2p5/3b4/4p3/8/8/8");
    assert.sameDeepMembers(generator.generateMoves("d5"), [
      "e6",
      "f7",
      "g8",
      "c4",
      "b3",
      "a2",
    ]);

    generator = make("8/8/2P5/3b4/4P3/8/8/8");
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

  it("rook", () => {
    let generator = make("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
    assert.sameDeepMembers(generator.generateMoves("a1"), []);
    assert.sameDeepMembers(generator.generateMoves("h1"), []);
    assert.sameDeepMembers(generator.generateMoves("a8"), []);
    assert.sameDeepMembers(generator.generateMoves("h8"), []);

    generator = make("r7/8/8/8/8/8/8/8");
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

    generator = make("8/8/8/3R4/8/8/8/8");
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

    generator = make("8/8/8/2prp3/8/8/8/8");
    assert.sameDeepMembers(generator.generateMoves("d5"), [
      "d6",
      "d7",
      "d8",
      "d4",
      "d3",
      "d2",
      "d1",
    ]);

    generator = make("8/8/8/2PrP3/8/8/8/8");
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

  it("knight", () => {
    let generator = make("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
    assert.sameDeepMembers(generator.generateMoves("b1"), ["a3", "c3"]);
    assert.sameDeepMembers(generator.generateMoves("g1"), ["f3", "h3"]);
    assert.sameDeepMembers(generator.generateMoves("b8"), ["a6", "c6"]);
    assert.sameDeepMembers(generator.generateMoves("g8"), ["f6", "h6"]);

    generator = make("rnbqkbnr/8/pppppppp/8/8/PPPPPPPP/8/RNBQKBNR");
    assert.sameDeepMembers(generator.generateMoves("b1"), ["d2"]);
    assert.sameDeepMembers(generator.generateMoves("g1"), ["e2"]);
    assert.sameDeepMembers(generator.generateMoves("b8"), ["d7"]);
    assert.sameDeepMembers(generator.generateMoves("g8"), ["e7"]);

    generator = make("n7/8/8/8/8/8/8/7N");
    assert.sameDeepMembers(generator.generateMoves("a8"), ["c7", "b6"]);
    assert.sameDeepMembers(generator.generateMoves("h1"), ["f2", "g3"]);

    generator = make("8/8/8/3n4/8/8/8/8");
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

    generator = make("8/2p1p3/1p3p2/3N4/1p3p2/2p1p3/8/8");
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

    generator = make("8/2P1P3/1P3P2/3N4/1P3P2/2P1P3/8/8");
    assert.sameDeepMembers(generator.generateMoves("d5"), []);

    generator = make("8/2p1p3/1p3p2/3N4/1P3P2/2P1P3/8/8");
    assert.sameDeepMembers(generator.generateMoves("d5"), [
      "e7",
      "f6",
      "b6",
      "c7",
    ]);
  });
});
