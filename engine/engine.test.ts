import { expect } from "jsr:@std/expect";
import { Engine } from "./engine.ts";

Deno.test("fen", async (t) => {
  const engine = new Engine();

  await t.step("initial state", () => {
    expect(engine.fen()).toEqual(
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    );
  });

  await t.step("first move", () => {
    engine.move({ type: "normal", from: "e2", to: "e3" });

    expect(engine.fen()).toEqual(
      "rnbqkbnr/pppppppp/8/8/8/4P3/PPPP1PPP/RNBQKBNR b KQkq - 0 1"
    );
  });

  await t.step("second move", () => {
    engine.move({ type: "normal", from: "e7", to: "e6" });

    expect(engine.fen()).toEqual(
      "rnbqkbnr/pppp1ppp/4p3/8/8/4P3/PPPP1PPP/RNBQKBNR w KQkq - 0 2"
    );
  });
});

Deno.test("initial moves", async (t) => {
  const engine = new Engine();

  await t.step("white pawn", () => {
    expect(engine.possibleMoves("a2")).toEqual([
      { type: "normal", from: "a2", to: "a3" },
      { type: "normal", from: "a2", to: "a4" },
    ]);
    expect(engine.possibleMoves("c2")).toEqual([
      { type: "normal", from: "c2", to: "c3" },
      { type: "normal", from: "c2", to: "c4" },
    ]);
    expect(engine.possibleMoves("d2")).toEqual([
      { type: "normal", from: "d2", to: "d3" },
      { type: "normal", from: "d2", to: "d4" },
    ]);
    expect(engine.possibleMoves("e2")).toEqual([
      { type: "normal", from: "e2", to: "e3" },
      { type: "normal", from: "e2", to: "e4" },
    ]);
    expect(engine.possibleMoves("f2")).toEqual([
      { type: "normal", from: "f2", to: "f3" },
      { type: "normal", from: "f2", to: "f4" },
    ]);
    expect(engine.possibleMoves("g2")).toEqual([
      { type: "normal", from: "g2", to: "g3" },
      { type: "normal", from: "g2", to: "g4" },
    ]);
    expect(engine.possibleMoves("h2")).toEqual([
      { type: "normal", from: "h2", to: "h3" },
      { type: "normal", from: "h2", to: "h4" },
    ]);
  });

  await t.step("black pawn", () => {
    expect(engine.possibleMoves("a7")).toEqual([
      { type: "normal", from: "a7", to: "a6" },
      { type: "normal", from: "a7", to: "a5" },
    ]);
    expect(engine.possibleMoves("b7")).toEqual([
      { type: "normal", from: "b7", to: "b6" },
      { type: "normal", from: "b7", to: "b5" },
    ]);
    expect(engine.possibleMoves("c7")).toEqual([
      { type: "normal", from: "c7", to: "c6" },
      { type: "normal", from: "c7", to: "c5" },
    ]);
    expect(engine.possibleMoves("d7")).toEqual([
      { type: "normal", from: "d7", to: "d6" },
      { type: "normal", from: "d7", to: "d5" },
    ]);
    expect(engine.possibleMoves("e7")).toEqual([
      { type: "normal", from: "e7", to: "e6" },
      { type: "normal", from: "e7", to: "e5" },
    ]);
    expect(engine.possibleMoves("f7")).toEqual([
      { type: "normal", from: "f7", to: "f6" },
      { type: "normal", from: "f7", to: "f5" },
    ]);
    expect(engine.possibleMoves("g7")).toEqual([
      { type: "normal", from: "g7", to: "g6" },
      { type: "normal", from: "g7", to: "g5" },
    ]);
    expect(engine.possibleMoves("h7")).toEqual([
      { type: "normal", from: "h7", to: "h6" },
      { type: "normal", from: "h7", to: "h5" },
    ]);
  });
});

Deno.test("capture", async (t) => {
  await t.step("n captures P", () => {
    const engine = new Engine();

    engine.move({ type: "normal", from: "e2", to: "e4" });
    engine.move({ type: "normal", from: "g8", to: "f6" });
    engine.move({ type: "normal", from: "f1", to: "c4" });
    expect(engine.fen()).toEqual(
      "rnbqkb1r/pppppppp/5n2/8/2B1P3/8/PPPP1PPP/RNBQK1NR b KQkq - 2 2"
    );

    // n captures:
    engine.move({ type: "normal", from: "f6", to: "e4" });
    expect(engine.fen()).toEqual(
      "rnbqkb1r/pppppppp/8/8/2B1n3/8/PPPP1PPP/RNBQK1NR w KQkq - 0 3"
    );
  });
});
