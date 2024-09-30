import { assert, describe, it } from "vitest";
import { Engine } from "./engine";

describe("engine", () => {
  it("initial state", () => {
    const engine = new Engine();

    assert.isTrue(
      engine.isLegal({ file: "a", rank: 2 }, { file: "a", rank: 3 })
    );
  });
});

describe("fen", () => {
  it("initial state", () => {
    const engine = new Engine();

    assert.equal(
      engine.fen(),
      "rnbqknbr/pppppppp/11111111/11111111/11111111/11111111/PPPPPPPP/RNBQKNBR w KQkq - 0 1"
    );
  });
});
