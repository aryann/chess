import { expect } from "jsr:@std/expect";
import { BoardState } from "./board.ts";

Deno.test("board", async (t) => {
  const board = new BoardState();

  await t.step("initial state", () => {
    // Rank 1
    expect(board.get("a1")).toEqual("R");
    expect(board.get("b1")).toEqual("N");
    expect(board.get("c1")).toEqual("B");
    expect(board.get("d1")).toEqual("Q");
    expect(board.get("e1")).toEqual("K");
    expect(board.get("f1")).toEqual("B");
    expect(board.get("g1")).toEqual("N");
    expect(board.get("h1")).toEqual("R");

    // Rank 2
    expect(board.get("a2")).toEqual("P");
    expect(board.get("b2")).toEqual("P");
    expect(board.get("c2")).toEqual("P");
    expect(board.get("d2")).toEqual("P");
    expect(board.get("e2")).toEqual("P");
    expect(board.get("f2")).toEqual("P");
    expect(board.get("g2")).toEqual("P");
    expect(board.get("h2")).toEqual("P");

    // Rank 3
    expect(board.get("a3")).toBeUndefined();
    expect(board.get("b3")).toBeUndefined();
    expect(board.get("c3")).toBeUndefined();
    expect(board.get("d3")).toBeUndefined();
    expect(board.get("e3")).toBeUndefined();
    expect(board.get("f3")).toBeUndefined();
    expect(board.get("g3")).toBeUndefined();
    expect(board.get("h3")).toBeUndefined();

    // Rank 4
    expect(board.get("a4")).toBeUndefined();
    expect(board.get("b4")).toBeUndefined();
    expect(board.get("c4")).toBeUndefined();
    expect(board.get("d4")).toBeUndefined();
    expect(board.get("e4")).toBeUndefined();
    expect(board.get("f4")).toBeUndefined();
    expect(board.get("g4")).toBeUndefined();
    expect(board.get("h4")).toBeUndefined();

    // Rank 5
    expect(board.get("a5")).toBeUndefined();
    expect(board.get("b5")).toBeUndefined();
    expect(board.get("c5")).toBeUndefined();
    expect(board.get("d5")).toBeUndefined();
    expect(board.get("e5")).toBeUndefined();
    expect(board.get("f5")).toBeUndefined();
    expect(board.get("g5")).toBeUndefined();
    expect(board.get("h5")).toBeUndefined();

    // Rank 6
    expect(board.get("a6")).toBeUndefined();
    expect(board.get("b6")).toBeUndefined();
    expect(board.get("c6")).toBeUndefined();
    expect(board.get("d6")).toBeUndefined();
    expect(board.get("e6")).toBeUndefined();
    expect(board.get("f6")).toBeUndefined();
    expect(board.get("g6")).toBeUndefined();
    expect(board.get("h6")).toBeUndefined();

    // Rank 7
    expect(board.get("a7")).toEqual("p");
    expect(board.get("b7")).toEqual("p");
    expect(board.get("c7")).toEqual("p");
    expect(board.get("d7")).toEqual("p");
    expect(board.get("e7")).toEqual("p");
    expect(board.get("f7")).toEqual("p");
    expect(board.get("g7")).toEqual("p");
    expect(board.get("h7")).toEqual("p");

    // Rank 8
    expect(board.get("a8")).toEqual("r");
    expect(board.get("b8")).toEqual("n");
    expect(board.get("c8")).toEqual("b");
    expect(board.get("d8")).toEqual("q");
    expect(board.get("e8")).toEqual("k");
    expect(board.get("f8")).toEqual("b");
    expect(board.get("g8")).toEqual("n");
    expect(board.get("h8")).toEqual("r");
  });
});

Deno.test("from fen", async (t) => {
  await t.step("invalid fen", () => {
    expect(() => new BoardState("invalid")).toThrow(
      "Forsyth–Edwards Notation (FEN) must have six parts: invalid"
    );
  });

  await t.step("invalid part count", () => {
    expect(
      () =>
        new BoardState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -")
    ).toThrow(
      "Forsyth–Edwards Notation (FEN) must have six parts: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -"
    );
  });

  await t.step("invalid rank count", () => {
    expect(
      () =>
        new BoardState("rnbqkbnr/pppppppp/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    ).toThrow(
      "Forsyth–Edwards Notation (FEN) must have eight ranks: rnbqkbnr/pppppppp/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    );
  });

  await t.step("invalid side to move", () => {
    expect(
      () =>
        new BoardState(
          "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR WHITE KQkq - 0 1"
        )
    ).toThrow(
      "Forsyth–Edwards Notation (FEN) has invalid side to move: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR WHITE KQkq - 0 1"
    );
  });

  await t.step("invalid half moves", () => {
    expect(
      () =>
        new BoardState(
          "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - -10 1"
        )
    ).toThrow(
      "Forsyth–Edwards Notation (FEN) has invalid half moves: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - -10 1"
    );
  });

  await t.step("invalid full moves", () => {
    expect(
      () =>
        new BoardState(
          "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 -10"
        )
    ).toThrow(
      "Forsyth–Edwards Notation (FEN) has invalid full moves: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 -10"
    );
  });

  await t.step("initial state", () => {
    const board = new BoardState(
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    );

    // Rank 1
    expect(board.get("a1")).toEqual("R");
    expect(board.get("b1")).toEqual("N");
    expect(board.get("c1")).toEqual("B");
    expect(board.get("d1")).toEqual("Q");
    expect(board.get("e1")).toEqual("K");
    expect(board.get("f1")).toEqual("B");
    expect(board.get("g1")).toEqual("N");
    expect(board.get("h1")).toEqual("R");

    // Rank 2
    expect(board.get("a2")).toEqual("P");
    expect(board.get("b2")).toEqual("P");
    expect(board.get("c2")).toEqual("P");
    expect(board.get("d2")).toEqual("P");
    expect(board.get("e2")).toEqual("P");
    expect(board.get("f2")).toEqual("P");
    expect(board.get("g2")).toEqual("P");
    expect(board.get("h2")).toEqual("P");

    // Rank 3
    expect(board.get("a3")).toBeUndefined();
    expect(board.get("b3")).toBeUndefined();
    expect(board.get("c3")).toBeUndefined();
    expect(board.get("d3")).toBeUndefined();
    expect(board.get("e3")).toBeUndefined();
    expect(board.get("f3")).toBeUndefined();
    expect(board.get("g3")).toBeUndefined();
    expect(board.get("h3")).toBeUndefined();

    // Rank 4
    expect(board.get("a4")).toBeUndefined();
    expect(board.get("b4")).toBeUndefined();
    expect(board.get("c4")).toBeUndefined();
    expect(board.get("d4")).toBeUndefined();
    expect(board.get("e4")).toBeUndefined();
    expect(board.get("f4")).toBeUndefined();
    expect(board.get("g4")).toBeUndefined();
    expect(board.get("h4")).toBeUndefined();

    // Rank 5
    expect(board.get("a5")).toBeUndefined();
    expect(board.get("b5")).toBeUndefined();
    expect(board.get("c5")).toBeUndefined();
    expect(board.get("d5")).toBeUndefined();
    expect(board.get("e5")).toBeUndefined();
    expect(board.get("f5")).toBeUndefined();
    expect(board.get("g5")).toBeUndefined();
    expect(board.get("h5")).toBeUndefined();

    // Rank 6
    expect(board.get("a6")).toBeUndefined();
    expect(board.get("b6")).toBeUndefined();
    expect(board.get("c6")).toBeUndefined();
    expect(board.get("d6")).toBeUndefined();
    expect(board.get("e6")).toBeUndefined();
    expect(board.get("f6")).toBeUndefined();
    expect(board.get("g6")).toBeUndefined();
    expect(board.get("h6")).toBeUndefined();

    // Rank 7
    expect(board.get("a7")).toEqual("p");
    expect(board.get("b7")).toEqual("p");
    expect(board.get("c7")).toEqual("p");
    expect(board.get("d7")).toEqual("p");
    expect(board.get("e7")).toEqual("p");
    expect(board.get("f7")).toEqual("p");
    expect(board.get("g7")).toEqual("p");
    expect(board.get("h7")).toEqual("p");

    // Rank 8
    expect(board.get("a8")).toEqual("r");
    expect(board.get("b8")).toEqual("n");
    expect(board.get("c8")).toEqual("b");
    expect(board.get("d8")).toEqual("q");
    expect(board.get("e8")).toEqual("k");
    expect(board.get("f8")).toEqual("b");
    expect(board.get("g8")).toEqual("n");
    expect(board.get("h8")).toEqual("r");
  });

  await t.step("mid state", () => {
    const board = new BoardState("8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 40 40");

    // Rank 1
    expect(board.get("a1")).toBeUndefined();
    expect(board.get("b1")).toBeUndefined();
    expect(board.get("c1")).toBeUndefined();
    expect(board.get("d1")).toBeUndefined();
    expect(board.get("e1")).toBeUndefined();
    expect(board.get("f1")).toBeUndefined();
    expect(board.get("g1")).toBeUndefined();
    expect(board.get("h1")).toBeUndefined();

    // Rank 2
    expect(board.get("a2")).toBeUndefined();
    expect(board.get("b2")).toBeUndefined();
    expect(board.get("c2")).toBeUndefined();
    expect(board.get("d2")).toBeUndefined();
    expect(board.get("e2")).toEqual("P");
    expect(board.get("f2")).toBeUndefined();
    expect(board.get("g2")).toEqual("P");
    expect(board.get("h2")).toBeUndefined();

    // Rank 3
    expect(board.get("a3")).toBeUndefined();
    expect(board.get("b3")).toBeUndefined();
    expect(board.get("c3")).toBeUndefined();
    expect(board.get("d3")).toBeUndefined();
    expect(board.get("e3")).toBeUndefined();
    expect(board.get("f3")).toBeUndefined();
    expect(board.get("g3")).toBeUndefined();
    expect(board.get("h3")).toBeUndefined();

    // Rank 4
    expect(board.get("a4")).toBeUndefined();
    expect(board.get("b4")).toEqual("R");
    expect(board.get("c4")).toBeUndefined();
    expect(board.get("d4")).toBeUndefined();
    expect(board.get("e4")).toBeUndefined();
    expect(board.get("f4")).toEqual("p");
    expect(board.get("g4")).toBeUndefined();
    expect(board.get("h4")).toEqual("k");

    // Rank 5
    expect(board.get("a5")).toEqual("K");
    expect(board.get("b5")).toEqual("P");
    expect(board.get("c5")).toBeUndefined();
    expect(board.get("d5")).toBeUndefined();
    expect(board.get("e5")).toBeUndefined();
    expect(board.get("f5")).toBeUndefined();
    expect(board.get("g5")).toBeUndefined();
    expect(board.get("h5")).toEqual("r");

    // Rank 6
    expect(board.get("a6")).toBeUndefined();
    expect(board.get("b6")).toBeUndefined();
    expect(board.get("c6")).toBeUndefined();
    expect(board.get("d6")).toEqual("p");
    expect(board.get("e6")).toBeUndefined();
    expect(board.get("f6")).toBeUndefined();
    expect(board.get("g6")).toBeUndefined();
    expect(board.get("h6")).toBeUndefined();

    // Rank 7
    expect(board.get("a7")).toBeUndefined();
    expect(board.get("b7")).toBeUndefined();
    expect(board.get("c7")).toEqual("p");
    expect(board.get("d7")).toBeUndefined();
    expect(board.get("e7")).toBeUndefined();
    expect(board.get("f7")).toBeUndefined();
    expect(board.get("g7")).toBeUndefined();
    expect(board.get("h7")).toBeUndefined();

    // Rank 8
    expect(board.get("a8")).toBeUndefined();
    expect(board.get("b8")).toBeUndefined();
    expect(board.get("c8")).toBeUndefined();
    expect(board.get("d8")).toBeUndefined();
    expect(board.get("e8")).toBeUndefined();
    expect(board.get("f8")).toBeUndefined();
    expect(board.get("g8")).toBeUndefined();
    expect(board.get("h8")).toBeUndefined();
  });

  await t.step("side to move", () => {
    expect(
      new BoardState("8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 40 40").sideToMove()
    ).toEqual("w");

    expect(
      new BoardState("8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 b - - 40 40").sideToMove()
    ).toEqual("b");
  });
});

Deno.test("castling rights", async (t) => {
  await t.step("K move", () => {
    const board = new BoardState();
    expect(board.fen()).toContain("KQkq");
    expect(board.castlingRights()).toEqual({
      K: true,
      Q: true,
      k: true,
      q: true,
    });

    board.move({ type: "normal", from: "e2", to: "e3" });
    board.move({ type: "normal", from: "a7", to: "a6" });
    board.move({ type: "normal", from: "f1", to: "e2" });
    board.move({ type: "normal", from: "b7", to: "b6" });
    board.move({ type: "normal", from: "g1", to: "f3" });
    board.move({ type: "normal", from: "c7", to: "c6" });

    expect(board.fen()).toContain("KQkq");

    board.move({ type: "normal", from: "e1", to: "f1" });
    expect(board.fen()).toEqual(
      "rnbqkbnr/3ppppp/ppp5/8/8/4PN2/PPPPBPPP/RNBQ1K1R b kq - 1 4"
    );
    expect(board.castlingRights()).toEqual({
      K: false,
      Q: false,
      k: true,
      q: true,
    });
  });

  await t.step("k move", () => {
    const board = new BoardState();
    expect(board.fen()).toContain("KQkq");
    expect(board.castlingRights()).toEqual({
      K: true,
      Q: true,
      k: true,
      q: true,
    });

    board.move({ type: "normal", from: "a2", to: "a3" });
    board.move({ type: "normal", from: "e7", to: "e6" });
    board.move({ type: "normal", from: "b2", to: "b3" });
    board.move({ type: "normal", from: "f8", to: "e7" });
    board.move({ type: "normal", from: "c2", to: "c3" });
    board.move({ type: "normal", from: "g8", to: "f6" });
    board.move({ type: "normal", from: "d2", to: "d3" });

    expect(board.fen()).toContain("KQkq");

    board.move({ type: "normal", from: "e8", to: "f8" });
    expect(board.fen()).toEqual(
      "rnbq1k1r/ppppbppp/4pn2/8/8/PPPP4/4PPPP/RNBQKBNR w KQ - 1 5"
    );
    expect(board.castlingRights()).toEqual({
      K: true,
      Q: true,
      k: false,
      q: false,
    });
  });

  await t.step("queen side R move", () => {
    const board = new BoardState();
    expect(board.fen()).toContain("KQkq");
    expect(board.castlingRights()).toEqual({
      K: true,
      Q: true,
      k: true,
      q: true,
    });

    board.move({ type: "normal", from: "b1", to: "c3" });
    board.move({ type: "normal", from: "a7", to: "a6" });

    expect(board.fen()).toContain("KQkq");

    board.move({ type: "normal", from: "a1", to: "b1" });
    expect(board.fen()).toEqual(
      "rnbqkbnr/1ppppppp/p7/8/8/2N5/PPPPPPPP/1RBQKBNR b Kkq - 1 2"
    );
    expect(board.castlingRights()).toEqual({
      K: true,
      Q: false,
      k: true,
      q: true,
    });
  });

  await t.step("king side R move", () => {
    const board = new BoardState();
    expect(board.fen()).toContain("KQkq");
    expect(board.castlingRights()).toEqual({
      K: true,
      Q: true,
      k: true,
      q: true,
    });

    board.move({ type: "normal", from: "g1", to: "f3" });
    board.move({ type: "normal", from: "a7", to: "a6" });

    expect(board.fen()).toContain("KQkq");

    board.move({ type: "normal", from: "h1", to: "g1" });
    expect(board.fen()).toEqual(
      "rnbqkbnr/1ppppppp/p7/8/8/5N2/PPPPPPPP/RNBQKBR1 b Qkq - 1 2"
    );
    expect(board.castlingRights()).toEqual({
      K: false,
      Q: true,
      k: true,
      q: true,
    });
  });

  await t.step("queen side r move", () => {
    const board = new BoardState();
    expect(board.fen()).toContain("KQkq");
    expect(board.castlingRights()).toEqual({
      K: true,
      Q: true,
      k: true,
      q: true,
    });

    board.move({ type: "normal", from: "a2", to: "a3" });
    board.move({ type: "normal", from: "b8", to: "c6" });
    board.move({ type: "normal", from: "b2", to: "b3" });

    expect(board.fen()).toContain("KQkq");

    board.move({ type: "normal", from: "a8", to: "b8" });
    expect(board.fen()).toEqual(
      "1rbqkbnr/pppppppp/2n5/8/8/PP6/2PPPPPP/RNBQKBNR w KQk - 1 3"
    );
    expect(board.castlingRights()).toEqual({
      K: true,
      Q: true,
      k: true,
      q: false,
    });
  });

  await t.step("king side r move", () => {
    const board = new BoardState();
    expect(board.fen()).toContain("KQkq");
    expect(board.castlingRights()).toEqual({
      K: true,
      Q: true,
      k: true,
      q: true,
    });

    board.move({ type: "normal", from: "a2", to: "a3" });
    board.move({ type: "normal", from: "g8", to: "f6" });
    board.move({ type: "normal", from: "b2", to: "b3" });

    expect(board.fen()).toContain("KQkq");

    board.move({ type: "normal", from: "h8", to: "g8" });
    expect(board.fen()).toEqual(
      "rnbqkbr1/pppppppp/5n2/8/8/PP6/2PPPPPP/RNBQKBNR w KQq - 1 3"
    );
    expect(board.castlingRights()).toEqual({
      K: true,
      Q: true,
      k: false,
      q: true,
    });
  });
});

Deno.test("castling", async (t) => {
  await t.step("K king side", () => {
    const board = new BoardState();

    // Make space for a castle:
    board.move({ type: "normal", from: "e2", to: "e3" });
    board.move({ type: "normal", from: "a7", to: "a6" });
    board.move({ type: "normal", from: "f1", to: "e2" });
    board.move({ type: "normal", from: "b7", to: "b6" });
    board.move({ type: "normal", from: "g1", to: "f3" });
    board.move({ type: "normal", from: "c7", to: "c6" });

    // Castling move:
    board.move({ type: "normal", from: "e1", to: "g1" });
    expect(board.fen()).toEqual(
      "rnbqkbnr/3ppppp/ppp5/8/8/4PN2/PPPPBPPP/RNBQ1RK1 b kq - 1 4"
    );
  });

  await t.step("K queen side", () => {
    const board = new BoardState();

    // Make space for a castle:
    board.move({ type: "normal", from: "d2", to: "d3" });
    board.move({ type: "normal", from: "a7", to: "a6" });
    board.move({ type: "normal", from: "c1", to: "e3" });
    board.move({ type: "normal", from: "b7", to: "b6" });
    board.move({ type: "normal", from: "d1", to: "d2" });
    board.move({ type: "normal", from: "c7", to: "c6" });
    board.move({ type: "normal", from: "b1", to: "c3" });
    board.move({ type: "normal", from: "d7", to: "d6" });

    // Castling move:
    board.move({ type: "normal", from: "e1", to: "c1" });
    expect(board.fen()).toEqual(
      "rnbqkbnr/4pppp/pppp4/8/8/2NPB3/PPPQPPPP/2KR1BNR b kq - 1 5"
    );
  });

  await t.step("k king side", () => {
    const board = new BoardState();

    // Make space for a castle:
    board.move({ type: "normal", from: "a2", to: "a3" });
    board.move({ type: "normal", from: "e7", to: "e6" });
    board.move({ type: "normal", from: "b2", to: "b3" });
    board.move({ type: "normal", from: "f8", to: "e7" });
    board.move({ type: "normal", from: "c2", to: "c3" });
    board.move({ type: "normal", from: "g8", to: "f6" });
    board.move({ type: "normal", from: "d2", to: "d3" });

    // Castling move:
    board.move({ type: "normal", from: "e8", to: "g8" });

    expect(board.fen()).toEqual(
      "rnbq1rk1/ppppbppp/4pn2/8/8/PPPP4/4PPPP/RNBQKBNR w KQ - 1 5"
    );
  });

  await t.step("k queen side", () => {
    const board = new BoardState();

    // Make space for a castle:
    board.move({ type: "normal", from: "a2", to: "a3" });
    board.move({ type: "normal", from: "d7", to: "d6" });
    board.move({ type: "normal", from: "b2", to: "b3" });
    board.move({ type: "normal", from: "c8", to: "e6" });
    board.move({ type: "normal", from: "c2", to: "c3" });
    board.move({ type: "normal", from: "d8", to: "d7" });
    board.move({ type: "normal", from: "d2", to: "d3" });
    board.move({ type: "normal", from: "b8", to: "c6" });
    board.move({ type: "normal", from: "e2", to: "e3" });

    // Castling move:
    board.move({ type: "normal", from: "e8", to: "c8" });

    expect(board.fen()).toEqual(
      "2kr1bnr/pppqpppp/2npb3/8/8/PPPPP3/5PPP/RNBQKBNR w KQ - 1 6"
    );
  });
});

Deno.test("promotion", async (t) => {
  await t.step("P", () => {
    const board = new BoardState("8/P7/8/8/8/8/8/8 w - - 40 40");

    board.move({ type: "promotion", from: "a7", to: "a8", promoteTo: "Q" });

    expect(board.fen()).toEqual("Q7/8/8/8/8/8/8/8 b - - 0 40");
  });
});

Deno.test("en passant", async (t) => {
  await t.step("p captures P from left", () => {
    const board = new BoardState();
    expect(board.enPassantTarget()).toBeUndefined();

    board.move({ type: "normal", from: "b1", to: "c3" });
    board.move({ type: "normal", from: "d7", to: "d5" });
    board.move({ type: "normal", from: "c3", to: "b1" });
    board.move({ type: "normal", from: "d5", to: "d4" });

    board.move({ type: "normal", from: "e2", to: "e4" });
    expect(board.enPassantTarget()).toEqual("e3");
    expect(board.fen()).toEqual(
      "rnbqkbnr/ppp1pppp/8/8/3pP3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 3"
    );

    board.move({ type: "enPassant", from: "d4", to: "e3" });
    expect(board.enPassantTarget()).toBeUndefined();
    expect(board.fen()).toEqual(
      "rnbqkbnr/ppp1pppp/8/8/8/4p3/PPPP1PPP/RNBQKBNR w KQkq - 0 4"
    );
  });

  await t.step("p captures P from right", () => {
    const board = new BoardState();
    expect(board.enPassantTarget()).toBeUndefined();

    board.move({ type: "normal", from: "b1", to: "c3" });
    board.move({ type: "normal", from: "f7", to: "f5" });
    board.move({ type: "normal", from: "c3", to: "b1" });
    board.move({ type: "normal", from: "f5", to: "f4" });

    board.move({ type: "normal", from: "e2", to: "e4" });
    expect(board.enPassantTarget()).toEqual("e3");
    expect(board.fen()).toEqual(
      "rnbqkbnr/ppppp1pp/8/8/4Pp2/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 3"
    );

    board.move({ type: "enPassant", from: "f4", to: "e3" });
    expect(board.enPassantTarget()).toBeUndefined();
    expect(board.fen()).toEqual(
      "rnbqkbnr/ppppp1pp/8/8/8/4p3/PPPP1PPP/RNBQKBNR w KQkq - 0 4"
    );
  });

  await t.step("P captures p from left", () => {
    const board = new BoardState();
    expect(board.enPassantTarget()).toBeUndefined();

    board.move({ type: "normal", from: "e2", to: "e4" });
    board.move({ type: "normal", from: "b8", to: "c6" });
    board.move({ type: "normal", from: "e4", to: "e5" });
    board.move({ type: "normal", from: "d7", to: "d5" });

    expect(board.enPassantTarget()).toEqual("d6");
    expect(board.fen()).toEqual(
      "r1bqkbnr/ppp1pppp/2n5/3pP3/8/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 3"
    );

    board.move({ type: "enPassant", from: "e5", to: "d6" });
    expect(board.enPassantTarget()).toBeUndefined();
    expect(board.fen()).toEqual(
      "r1bqkbnr/ppp1pppp/2nP4/8/8/8/PPPP1PPP/RNBQKBNR b KQkq - 0 3"
    );
  });

  await t.step("P captures p from right", () => {
    const board = new BoardState();
    expect(board.enPassantTarget()).toBeUndefined();

    board.move({ type: "normal", from: "e2", to: "e4" });
    board.move({ type: "normal", from: "b8", to: "c6" });
    board.move({ type: "normal", from: "e4", to: "e5" });
    board.move({ type: "normal", from: "f7", to: "f5" });

    expect(board.enPassantTarget()).toEqual("f6");
    expect(board.fen()).toEqual(
      "r1bqkbnr/ppppp1pp/2n5/4Pp2/8/8/PPPP1PPP/RNBQKBNR w KQkq f6 0 3"
    );

    board.move({ type: "enPassant", from: "e5", to: "f6" });
    expect(board.enPassantTarget()).toBeUndefined();
    expect(board.fen()).toEqual(
      "r1bqkbnr/ppppp1pp/2n2P2/8/8/8/PPPP1PPP/RNBQKBNR b KQkq - 0 3"
    );
  });
});
