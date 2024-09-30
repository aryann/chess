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
