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
    assert.isTrue(engine.isLegal("e2", "e3"));
    engine.move("e2", "e3");
    assert.isFalse(engine.isLegal("e2", "e3"));

    assert.equal(
      engine.fen(),
      "rnbqkbnr/pppppppp/8/8/8/4P3/PPPP1PPP/RNBQKBNR b KQkq - 0 1"
    );
  });

  it("second move", () => {
    assert.isTrue(engine.isLegal("e7", "e6"));
    engine.move("e7", "e6");
    assert.isFalse(engine.isLegal("e7", "e6"));

    assert.equal(
      engine.fen(),
      "rnbqkbnr/pppp1ppp/4p3/8/8/4P3/PPPP1PPP/RNBQKBNR w KQkq - 0 2"
    );
  });
});

describe("initial moves", () => {
  const engine = new Engine();

  it("white pawn", () => {
    assert.deepEqual(engine.moves("a2"), ["a3", "a4"]);
    assert.deepEqual(engine.moves("c2"), ["c3", "c4"]);
    assert.deepEqual(engine.moves("d2"), ["d3", "d4"]);
    assert.deepEqual(engine.moves("e2"), ["e3", "e4"]);
    assert.deepEqual(engine.moves("f2"), ["f3", "f4"]);
    assert.deepEqual(engine.moves("g2"), ["g3", "g4"]);
    assert.deepEqual(engine.moves("h2"), ["h3", "h4"]);
  });

  it("black pawn", () => {
    assert.deepEqual(engine.moves("a7"), ["a6", "a5"]);
    assert.deepEqual(engine.moves("b7"), ["b6", "b5"]);
    assert.deepEqual(engine.moves("c7"), ["c6", "c5"]);
    assert.deepEqual(engine.moves("d7"), ["d6", "d5"]);
    assert.deepEqual(engine.moves("e7"), ["e6", "e5"]);
    assert.deepEqual(engine.moves("f7"), ["f6", "f5"]);
    assert.deepEqual(engine.moves("g7"), ["g6", "g5"]);
    assert.deepEqual(engine.moves("h7"), ["h6", "h5"]);
  });
});

describe("capture", () => {
  it("n captures P", () => {
    const engine = new Engine();

    engine.move("e2", "e4");
    engine.move("g8", "f6");
    engine.move("f1", "c4");
    assert.equal(
      engine.fen(),
      "rnbqkb1r/pppppppp/5n2/8/2B1P3/8/PPPP1PPP/RNBQK1NR b KQkq - 2 2"
    );

    // n captures:
    engine.move("f6", "e4");
    assert.equal(
      engine.fen(),
      "rnbqkb1r/pppppppp/8/8/2B1n3/8/PPPP1PPP/RNBQK1NR w KQkq - 0 3"
    );
  });
});
