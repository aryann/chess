import { assert, describe, it } from "vitest";
import { Engine } from "./engine";

describe("engine", () => {
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
      "rnbqkbnr/pppp1ppp/4p3/8/8/4P3/PPPP1PPP/RNBQKBNR w KQkq - 0 1"
    );
  });
});
