import { assert, describe, it } from "vitest";
import { Engine } from "./engine";

describe("fen", () => {
  const engine = new Engine();

  it("initial state", () => {
    assert.equal(
      engine.fen(),
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    );
  });

  it("first move", () => {
    engine.move({ type: "normal", from: "e2", to: "e3" });

    assert.equal(
      engine.fen(),
      "rnbqkbnr/pppppppp/8/8/8/4P3/PPPP1PPP/RNBQKBNR b KQkq - 0 1"
    );
  });

  it("second move", () => {
    engine.move({ type: "normal", from: "e7", to: "e6" });

    assert.equal(
      engine.fen(),
      "rnbqkbnr/pppp1ppp/4p3/8/8/4P3/PPPP1PPP/RNBQKBNR w KQkq - 0 2"
    );
  });
});

describe("initial moves", () => {
  const engine = new Engine();

  it("white pawn", () => {
    assert.deepEqual(engine.possibleMoves("a2"), [
      { type: "normal", from: "a2", to: "a3" },
      { type: "normal", from: "a2", to: "a4" },
    ]);
    assert.deepEqual(engine.possibleMoves("c2"), [
      { type: "normal", from: "c2", to: "c3" },
      { type: "normal", from: "c2", to: "c4" },
    ]);
    assert.deepEqual(engine.possibleMoves("d2"), [
      { type: "normal", from: "d2", to: "d3" },
      { type: "normal", from: "d2", to: "d4" },
    ]);
    assert.deepEqual(engine.possibleMoves("e2"), [
      { type: "normal", from: "e2", to: "e3" },
      { type: "normal", from: "e2", to: "e4" },
    ]);
    assert.deepEqual(engine.possibleMoves("f2"), [
      { type: "normal", from: "f2", to: "f3" },
      { type: "normal", from: "f2", to: "f4" },
    ]);
    assert.deepEqual(engine.possibleMoves("g2"), [
      { type: "normal", from: "g2", to: "g3" },
      { type: "normal", from: "g2", to: "g4" },
    ]);
    assert.deepEqual(engine.possibleMoves("h2"), [
      { type: "normal", from: "h2", to: "h3" },
      { type: "normal", from: "h2", to: "h4" },
    ]);
  });

  it("black pawn", () => {
    assert.deepEqual(engine.possibleMoves("a7"), [
      { type: "normal", from: "a7", to: "a6" },
      { type: "normal", from: "a7", to: "a5" },
    ]);
    assert.deepEqual(engine.possibleMoves("b7"), [
      { type: "normal", from: "b7", to: "b6" },
      { type: "normal", from: "b7", to: "b5" },
    ]);
    assert.deepEqual(engine.possibleMoves("c7"), [
      { type: "normal", from: "c7", to: "c6" },
      { type: "normal", from: "c7", to: "c5" },
    ]);
    assert.deepEqual(engine.possibleMoves("d7"), [
      { type: "normal", from: "d7", to: "d6" },
      { type: "normal", from: "d7", to: "d5" },
    ]);
    assert.deepEqual(engine.possibleMoves("e7"), [
      { type: "normal", from: "e7", to: "e6" },
      { type: "normal", from: "e7", to: "e5" },
    ]);
    assert.deepEqual(engine.possibleMoves("f7"), [
      { type: "normal", from: "f7", to: "f6" },
      { type: "normal", from: "f7", to: "f5" },
    ]);
    assert.deepEqual(engine.possibleMoves("g7"), [
      { type: "normal", from: "g7", to: "g6" },
      { type: "normal", from: "g7", to: "g5" },
    ]);
    assert.deepEqual(engine.possibleMoves("h7"), [
      { type: "normal", from: "h7", to: "h6" },
      { type: "normal", from: "h7", to: "h5" },
    ]);
  });
});

describe("capture", () => {
  it("n captures P", () => {
    const engine = new Engine();

    engine.move({ type: "normal", from: "e2", to: "e4" });
    engine.move({ type: "normal", from: "g8", to: "f6" });
    engine.move({ type: "normal", from: "f1", to: "c4" });
    assert.equal(
      engine.fen(),
      "rnbqkb1r/pppppppp/5n2/8/2B1P3/8/PPPP1PPP/RNBQK1NR b KQkq - 2 2"
    );

    // n captures:
    engine.move({ type: "normal", from: "f6", to: "e4" });
    assert.equal(
      engine.fen(),
      "rnbqkb1r/pppppppp/8/8/2B1n3/8/PPPP1PPP/RNBQK1NR w KQkq - 0 3"
    );
  });
});
