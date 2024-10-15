import { assertEquals } from "jsr:@std/assert";
import { expect } from "jsr:@std/expect";
import { BoardState } from "./board.ts";

Deno.test("board", async (t) => {
  const board = new BoardState();

  await t.step("initial state", () => {
    // Rank 1
    assertEquals(board.get("a1"), "R");
    assertEquals(board.get("b1"), "N");
    assertEquals(board.get("c1"), "B");
    assertEquals(board.get("d1"), "Q");
    assertEquals(board.get("e1"), "K");
    assertEquals(board.get("f1"), "B");
    assertEquals(board.get("g1"), "N");
    assertEquals(board.get("h1"), "R");

    // Rank 2
    assertEquals(board.get("a2"), "P");
    assertEquals(board.get("b2"), "P");
    assertEquals(board.get("c2"), "P");
    assertEquals(board.get("d2"), "P");
    assertEquals(board.get("e2"), "P");
    assertEquals(board.get("f2"), "P");
    assertEquals(board.get("g2"), "P");
    assertEquals(board.get("h2"), "P");

    // Rank 3
    assertEquals(board.get("a3"), undefined);
    assertEquals(board.get("b3"), undefined);
    assertEquals(board.get("c3"), undefined);
    assertEquals(board.get("d3"), undefined);
    assertEquals(board.get("e3"), undefined);
    assertEquals(board.get("f3"), undefined);
    assertEquals(board.get("g3"), undefined);
    assertEquals(board.get("h3"), undefined);

    // Rank 4
    assertEquals(board.get("a4"), undefined);
    assertEquals(board.get("b4"), undefined);
    assertEquals(board.get("c4"), undefined);
    assertEquals(board.get("d4"), undefined);
    assertEquals(board.get("e4"), undefined);
    assertEquals(board.get("f4"), undefined);
    assertEquals(board.get("g4"), undefined);
    assertEquals(board.get("h4"), undefined);

    // Rank 5
    assertEquals(board.get("a5"), undefined);
    assertEquals(board.get("b5"), undefined);
    assertEquals(board.get("c5"), undefined);
    assertEquals(board.get("d5"), undefined);
    assertEquals(board.get("e5"), undefined);
    assertEquals(board.get("f5"), undefined);
    assertEquals(board.get("g5"), undefined);
    assertEquals(board.get("h5"), undefined);

    // Rank 6
    assertEquals(board.get("a6"), undefined);
    assertEquals(board.get("b6"), undefined);
    assertEquals(board.get("c6"), undefined);
    assertEquals(board.get("d6"), undefined);
    assertEquals(board.get("e6"), undefined);
    assertEquals(board.get("f6"), undefined);
    assertEquals(board.get("g6"), undefined);
    assertEquals(board.get("h6"), undefined);

    // Rank 7
    assertEquals(board.get("a7"), "p");
    assertEquals(board.get("b7"), "p");
    assertEquals(board.get("c7"), "p");
    assertEquals(board.get("d7"), "p");
    assertEquals(board.get("e7"), "p");
    assertEquals(board.get("f7"), "p");
    assertEquals(board.get("g7"), "p");
    assertEquals(board.get("h7"), "p");

    // Rank 8
    assertEquals(board.get("a8"), "r");
    assertEquals(board.get("b8"), "n");
    assertEquals(board.get("c8"), "b");
    assertEquals(board.get("d8"), "q");
    assertEquals(board.get("e8"), "k");
    assertEquals(board.get("f8"), "b");
    assertEquals(board.get("g8"), "n");
    assertEquals(board.get("h8"), "r");
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
    assertEquals(board.get("a1"), "R");
    assertEquals(board.get("b1"), "N");
    assertEquals(board.get("c1"), "B");
    assertEquals(board.get("d1"), "Q");
    assertEquals(board.get("e1"), "K");
    assertEquals(board.get("f1"), "B");
    assertEquals(board.get("g1"), "N");
    assertEquals(board.get("h1"), "R");

    // Rank 2
    assertEquals(board.get("a2"), "P");
    assertEquals(board.get("b2"), "P");
    assertEquals(board.get("c2"), "P");
    assertEquals(board.get("d2"), "P");
    assertEquals(board.get("e2"), "P");
    assertEquals(board.get("f2"), "P");
    assertEquals(board.get("g2"), "P");
    assertEquals(board.get("h2"), "P");

    // Rank 3
    assertEquals(board.get("a3"), undefined);
    assertEquals(board.get("b3"), undefined);
    assertEquals(board.get("c3"), undefined);
    assertEquals(board.get("d3"), undefined);
    assertEquals(board.get("e3"), undefined);
    assertEquals(board.get("f3"), undefined);
    assertEquals(board.get("g3"), undefined);
    assertEquals(board.get("h3"), undefined);

    // Rank 4
    assertEquals(board.get("a4"), undefined);
    assertEquals(board.get("b4"), undefined);
    assertEquals(board.get("c4"), undefined);
    assertEquals(board.get("d4"), undefined);
    assertEquals(board.get("e4"), undefined);
    assertEquals(board.get("f4"), undefined);
    assertEquals(board.get("g4"), undefined);
    assertEquals(board.get("h4"), undefined);

    // Rank 5
    assertEquals(board.get("a5"), undefined);
    assertEquals(board.get("b5"), undefined);
    assertEquals(board.get("c5"), undefined);
    assertEquals(board.get("d5"), undefined);
    assertEquals(board.get("e5"), undefined);
    assertEquals(board.get("f5"), undefined);
    assertEquals(board.get("g5"), undefined);
    assertEquals(board.get("h5"), undefined);

    // Rank 6
    assertEquals(board.get("a6"), undefined);
    assertEquals(board.get("b6"), undefined);
    assertEquals(board.get("c6"), undefined);
    assertEquals(board.get("d6"), undefined);
    assertEquals(board.get("e6"), undefined);
    assertEquals(board.get("f6"), undefined);
    assertEquals(board.get("g6"), undefined);
    assertEquals(board.get("h6"), undefined);

    // Rank 7
    assertEquals(board.get("a7"), "p");
    assertEquals(board.get("b7"), "p");
    assertEquals(board.get("c7"), "p");
    assertEquals(board.get("d7"), "p");
    assertEquals(board.get("e7"), "p");
    assertEquals(board.get("f7"), "p");
    assertEquals(board.get("g7"), "p");
    assertEquals(board.get("h7"), "p");

    // Rank 8
    assertEquals(board.get("a8"), "r");
    assertEquals(board.get("b8"), "n");
    assertEquals(board.get("c8"), "b");
    assertEquals(board.get("d8"), "q");
    assertEquals(board.get("e8"), "k");
    assertEquals(board.get("f8"), "b");
    assertEquals(board.get("g8"), "n");
    assertEquals(board.get("h8"), "r");
  });

  await t.step("mid state", () => {
    const board = new BoardState("8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 40 40");

    // Rank 1
    assertEquals(board.get("a1"), undefined);
    assertEquals(board.get("b1"), undefined);
    assertEquals(board.get("c1"), undefined);
    assertEquals(board.get("d1"), undefined);
    assertEquals(board.get("e1"), undefined);
    assertEquals(board.get("f1"), undefined);
    assertEquals(board.get("g1"), undefined);
    assertEquals(board.get("h1"), undefined);

    // Rank 2
    assertEquals(board.get("a2"), undefined);
    assertEquals(board.get("b2"), undefined);
    assertEquals(board.get("c2"), undefined);
    assertEquals(board.get("d2"), undefined);
    assertEquals(board.get("e2"), "P");
    assertEquals(board.get("f2"), undefined);
    assertEquals(board.get("g2"), "P");
    assertEquals(board.get("h2"), undefined);

    // Rank 3
    assertEquals(board.get("a3"), undefined);
    assertEquals(board.get("b3"), undefined);
    assertEquals(board.get("c3"), undefined);
    assertEquals(board.get("d3"), undefined);
    assertEquals(board.get("e3"), undefined);
    assertEquals(board.get("f3"), undefined);
    assertEquals(board.get("g3"), undefined);
    assertEquals(board.get("h3"), undefined);

    // Rank 4
    assertEquals(board.get("a4"), undefined);
    assertEquals(board.get("b4"), "R");
    assertEquals(board.get("c4"), undefined);
    assertEquals(board.get("d4"), undefined);
    assertEquals(board.get("e4"), undefined);
    assertEquals(board.get("f4"), "p");
    assertEquals(board.get("g4"), undefined);
    assertEquals(board.get("h4"), "k");

    // Rank 5
    assertEquals(board.get("a5"), "K");
    assertEquals(board.get("b5"), "P");
    assertEquals(board.get("c5"), undefined);
    assertEquals(board.get("d5"), undefined);
    assertEquals(board.get("e5"), undefined);
    assertEquals(board.get("f5"), undefined);
    assertEquals(board.get("g5"), undefined);
    assertEquals(board.get("h5"), "r");

    // Rank 6
    assertEquals(board.get("a6"), undefined);
    assertEquals(board.get("b6"), undefined);
    assertEquals(board.get("c6"), undefined);
    assertEquals(board.get("d6"), "p");
    assertEquals(board.get("e6"), undefined);
    assertEquals(board.get("f6"), undefined);
    assertEquals(board.get("g6"), undefined);
    assertEquals(board.get("h6"), undefined);

    // Rank 7
    assertEquals(board.get("a7"), undefined);
    assertEquals(board.get("b7"), undefined);
    assertEquals(board.get("c7"), "p");
    assertEquals(board.get("d7"), undefined);
    assertEquals(board.get("e7"), undefined);
    assertEquals(board.get("f7"), undefined);
    assertEquals(board.get("g7"), undefined);
    assertEquals(board.get("h7"), undefined);

    // Rank 8
    assertEquals(board.get("a8"), undefined);
    assertEquals(board.get("b8"), undefined);
    assertEquals(board.get("c8"), undefined);
    assertEquals(board.get("d8"), undefined);
    assertEquals(board.get("e8"), undefined);
    assertEquals(board.get("f8"), undefined);
    assertEquals(board.get("g8"), undefined);
    assertEquals(board.get("h8"), undefined);
  });

  await t.step("side to move", () => {
    assertEquals(
      new BoardState(
        "8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 40 40"
      ).sideToMove(),
      "w"
    );

    assertEquals(
      new BoardState(
        "8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 b - - 40 40"
      ).sideToMove(),
      "b"
    );
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
    assertEquals(
      board.fen(),
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
    assertEquals(
      board.fen(),
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
    assertEquals(
      board.fen(),
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
    assertEquals(
      board.fen(),
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
    assertEquals(
      board.fen(),
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
    assertEquals(
      board.fen(),
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
    assertEquals(
      board.fen(),
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
    assertEquals(
      board.fen(),
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

    assertEquals(
      board.fen(),
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

    assertEquals(
      board.fen(),
      "2kr1bnr/pppqpppp/2npb3/8/8/PPPPP3/5PPP/RNBQKBNR w KQ - 1 6"
    );
  });
});

Deno.test("promotion", async (t) => {
  await t.step("P", () => {
    const board = new BoardState("8/P7/8/8/8/8/8/8 w - - 40 40");

    board.move({ type: "promotion", from: "a7", to: "a8", promoteTo: "Q" });

    assertEquals(board.fen(), "Q7/8/8/8/8/8/8/8 b - - 0 40");
  });
});

Deno.test("en passant", async (t) => {
  await t.step("p captures P from left", () => {
    const board = new BoardState();
    assertEquals(board.enPassantTarget(), undefined);

    board.move({ type: "normal", from: "b1", to: "c3" });
    board.move({ type: "normal", from: "d7", to: "d5" });
    board.move({ type: "normal", from: "c3", to: "b1" });
    board.move({ type: "normal", from: "d5", to: "d4" });

    board.move({ type: "normal", from: "e2", to: "e4" });
    assertEquals(board.enPassantTarget(), "e3");
    assertEquals(
      board.fen(),
      "rnbqkbnr/ppp1pppp/8/8/3pP3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 3"
    );

    board.move({ type: "enPassant", from: "d4", to: "e3" });
    assertEquals(board.enPassantTarget(), undefined);
    assertEquals(
      board.fen(),
      "rnbqkbnr/ppp1pppp/8/8/8/4p3/PPPP1PPP/RNBQKBNR w KQkq - 0 4"
    );
  });

  await t.step("p captures P from right", () => {
    const board = new BoardState();
    assertEquals(board.enPassantTarget(), undefined);

    board.move({ type: "normal", from: "b1", to: "c3" });
    board.move({ type: "normal", from: "f7", to: "f5" });
    board.move({ type: "normal", from: "c3", to: "b1" });
    board.move({ type: "normal", from: "f5", to: "f4" });

    board.move({ type: "normal", from: "e2", to: "e4" });
    assertEquals(board.enPassantTarget(), "e3");
    assertEquals(
      board.fen(),
      "rnbqkbnr/ppppp1pp/8/8/4Pp2/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 3"
    );

    board.move({ type: "enPassant", from: "f4", to: "e3" });
    assertEquals(board.enPassantTarget(), undefined);
    assertEquals(
      board.fen(),
      "rnbqkbnr/ppppp1pp/8/8/8/4p3/PPPP1PPP/RNBQKBNR w KQkq - 0 4"
    );
  });

  await t.step("P captures p from left", () => {
    const board = new BoardState();
    assertEquals(board.enPassantTarget(), undefined);

    board.move({ type: "normal", from: "e2", to: "e4" });
    board.move({ type: "normal", from: "b8", to: "c6" });
    board.move({ type: "normal", from: "e4", to: "e5" });
    board.move({ type: "normal", from: "d7", to: "d5" });

    assertEquals(board.enPassantTarget(), "d6");
    assertEquals(
      board.fen(),
      "r1bqkbnr/ppp1pppp/2n5/3pP3/8/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 3"
    );

    board.move({ type: "enPassant", from: "e5", to: "d6" });
    assertEquals(board.enPassantTarget(), undefined);
    assertEquals(
      board.fen(),
      "r1bqkbnr/ppp1pppp/2nP4/8/8/8/PPPP1PPP/RNBQKBNR b KQkq - 0 3"
    );
  });

  await t.step("P captures p from right", () => {
    const board = new BoardState();
    assertEquals(board.enPassantTarget(), undefined);

    board.move({ type: "normal", from: "e2", to: "e4" });
    board.move({ type: "normal", from: "b8", to: "c6" });
    board.move({ type: "normal", from: "e4", to: "e5" });
    board.move({ type: "normal", from: "f7", to: "f5" });

    assertEquals(board.enPassantTarget(), "f6");
    assertEquals(
      board.fen(),
      "r1bqkbnr/ppppp1pp/2n5/4Pp2/8/8/PPPP1PPP/RNBQKBNR w KQkq f6 0 3"
    );

    board.move({ type: "enPassant", from: "e5", to: "f6" });
    assertEquals(board.enPassantTarget(), undefined);
    assertEquals(
      board.fen(),
      "r1bqkbnr/ppppp1pp/2n2P2/8/8/8/PPPP1PPP/RNBQKBNR b KQkq - 0 3"
    );
  });
});
