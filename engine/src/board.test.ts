import { assert, describe, expect, it } from "vitest";
import { BoardState } from "./board";

describe("board", () => {
  const board = new BoardState();

  it("initial state", () => {
    // Rank 1
    assert.equal(board.get("a1"), "R");
    assert.equal(board.get("b1"), "N");
    assert.equal(board.get("c1"), "B");
    assert.equal(board.get("d1"), "Q");
    assert.equal(board.get("e1"), "K");
    assert.equal(board.get("f1"), "B");
    assert.equal(board.get("g1"), "N");
    assert.equal(board.get("h1"), "R");

    // Rank 2
    assert.equal(board.get("a2"), "P");
    assert.equal(board.get("b2"), "P");
    assert.equal(board.get("c2"), "P");
    assert.equal(board.get("d2"), "P");
    assert.equal(board.get("e2"), "P");
    assert.equal(board.get("f2"), "P");
    assert.equal(board.get("g2"), "P");
    assert.equal(board.get("h2"), "P");

    // Rank 3
    assert.isUndefined(board.get("a3"));
    assert.isUndefined(board.get("b3"));
    assert.isUndefined(board.get("c3"));
    assert.isUndefined(board.get("d3"));
    assert.isUndefined(board.get("e3"));
    assert.isUndefined(board.get("f3"));
    assert.isUndefined(board.get("g3"));
    assert.isUndefined(board.get("h3"));

    // Rank 4
    assert.isUndefined(board.get("a4"));
    assert.isUndefined(board.get("b4"));
    assert.isUndefined(board.get("c4"));
    assert.isUndefined(board.get("d4"));
    assert.isUndefined(board.get("e4"));
    assert.isUndefined(board.get("f4"));
    assert.isUndefined(board.get("g4"));
    assert.isUndefined(board.get("h4"));

    // Rank 5
    assert.isUndefined(board.get("a5"));
    assert.isUndefined(board.get("b5"));
    assert.isUndefined(board.get("c5"));
    assert.isUndefined(board.get("d5"));
    assert.isUndefined(board.get("e5"));
    assert.isUndefined(board.get("f5"));
    assert.isUndefined(board.get("g5"));
    assert.isUndefined(board.get("h5"));

    // Rank 6
    assert.isUndefined(board.get("a6"));
    assert.isUndefined(board.get("b6"));
    assert.isUndefined(board.get("c6"));
    assert.isUndefined(board.get("d6"));
    assert.isUndefined(board.get("e6"));
    assert.isUndefined(board.get("f6"));
    assert.isUndefined(board.get("g6"));
    assert.isUndefined(board.get("h6"));

    // Rank 7
    assert.equal(board.get("a7"), "p");
    assert.equal(board.get("b7"), "p");
    assert.equal(board.get("c7"), "p");
    assert.equal(board.get("d7"), "p");
    assert.equal(board.get("e7"), "p");
    assert.equal(board.get("f7"), "p");
    assert.equal(board.get("g7"), "p");
    assert.equal(board.get("h7"), "p");

    // Rank 8
    assert.equal(board.get("a8"), "r");
    assert.equal(board.get("b8"), "n");
    assert.equal(board.get("c8"), "b");
    assert.equal(board.get("d8"), "q");
    assert.equal(board.get("e8"), "k");
    assert.equal(board.get("f8"), "b");
    assert.equal(board.get("g8"), "n");
    assert.equal(board.get("h8"), "r");
  });
});

describe("from fen", () => {
  it("invalid fen", () => {
    expect(() => new BoardState("invalid")).toThrowError(
      "Forsyth–Edwards Notation (FEN) must have six parts: invalid"
    );
  });

  it("invalid part count", () => {
    expect(
      () =>
        new BoardState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -")
    ).toThrowError(
      "Forsyth–Edwards Notation (FEN) must have six parts: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -"
    );
  });

  it("invalid rank count", () => {
    expect(
      () =>
        new BoardState("rnbqkbnr/pppppppp/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    ).toThrowError(
      "Forsyth–Edwards Notation (FEN) must have eight ranks: rnbqkbnr/pppppppp/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    );
  });

  it("invalid side to move", () => {
    expect(
      () =>
        new BoardState(
          "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR WHITE KQkq - 0 1"
        )
    ).toThrowError(
      "Forsyth–Edwards Notation (FEN) has invalid side to move: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR WHITE KQkq - 0 1"
    );
  });

  it("invalid half moves", () => {
    expect(
      () =>
        new BoardState(
          "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - -10 1"
        )
    ).toThrowError(
      "Forsyth–Edwards Notation (FEN) has invalid half moves: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - -10 1"
    );
  });

  it("invalid full moves", () => {
    expect(
      () =>
        new BoardState(
          "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 -10"
        )
    ).toThrowError(
      "Forsyth–Edwards Notation (FEN) has invalid full moves: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 -10"
    );
  });

  it("initial state", () => {
    const board = new BoardState(
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    );

    // Rank 1
    assert.equal(board.get("a1"), "R");
    assert.equal(board.get("b1"), "N");
    assert.equal(board.get("c1"), "B");
    assert.equal(board.get("d1"), "Q");
    assert.equal(board.get("e1"), "K");
    assert.equal(board.get("f1"), "B");
    assert.equal(board.get("g1"), "N");
    assert.equal(board.get("h1"), "R");

    // Rank 2
    assert.equal(board.get("a2"), "P");
    assert.equal(board.get("b2"), "P");
    assert.equal(board.get("c2"), "P");
    assert.equal(board.get("d2"), "P");
    assert.equal(board.get("e2"), "P");
    assert.equal(board.get("f2"), "P");
    assert.equal(board.get("g2"), "P");
    assert.equal(board.get("h2"), "P");

    // Rank 3
    assert.isUndefined(board.get("a3"));
    assert.isUndefined(board.get("b3"));
    assert.isUndefined(board.get("c3"));
    assert.isUndefined(board.get("d3"));
    assert.isUndefined(board.get("e3"));
    assert.isUndefined(board.get("f3"));
    assert.isUndefined(board.get("g3"));
    assert.isUndefined(board.get("h3"));

    // Rank 4
    assert.isUndefined(board.get("a4"));
    assert.isUndefined(board.get("b4"));
    assert.isUndefined(board.get("c4"));
    assert.isUndefined(board.get("d4"));
    assert.isUndefined(board.get("e4"));
    assert.isUndefined(board.get("f4"));
    assert.isUndefined(board.get("g4"));
    assert.isUndefined(board.get("h4"));

    // Rank 5
    assert.isUndefined(board.get("a5"));
    assert.isUndefined(board.get("b5"));
    assert.isUndefined(board.get("c5"));
    assert.isUndefined(board.get("d5"));
    assert.isUndefined(board.get("e5"));
    assert.isUndefined(board.get("f5"));
    assert.isUndefined(board.get("g5"));
    assert.isUndefined(board.get("h5"));

    // Rank 6
    assert.isUndefined(board.get("a6"));
    assert.isUndefined(board.get("b6"));
    assert.isUndefined(board.get("c6"));
    assert.isUndefined(board.get("d6"));
    assert.isUndefined(board.get("e6"));
    assert.isUndefined(board.get("f6"));
    assert.isUndefined(board.get("g6"));
    assert.isUndefined(board.get("h6"));

    // Rank 7
    assert.equal(board.get("a7"), "p");
    assert.equal(board.get("b7"), "p");
    assert.equal(board.get("c7"), "p");
    assert.equal(board.get("d7"), "p");
    assert.equal(board.get("e7"), "p");
    assert.equal(board.get("f7"), "p");
    assert.equal(board.get("g7"), "p");
    assert.equal(board.get("h7"), "p");

    // Rank 8
    assert.equal(board.get("a8"), "r");
    assert.equal(board.get("b8"), "n");
    assert.equal(board.get("c8"), "b");
    assert.equal(board.get("d8"), "q");
    assert.equal(board.get("e8"), "k");
    assert.equal(board.get("f8"), "b");
    assert.equal(board.get("g8"), "n");
    assert.equal(board.get("h8"), "r");
  });

  it("mid state", () => {
    const board = new BoardState("8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 40 40");

    // Rank 1
    assert.isUndefined(board.get("a1"));
    assert.isUndefined(board.get("b1"));
    assert.isUndefined(board.get("c1"));
    assert.isUndefined(board.get("d1"));
    assert.isUndefined(board.get("e1"));
    assert.isUndefined(board.get("f1"));
    assert.isUndefined(board.get("g1"));
    assert.isUndefined(board.get("h1"));

    // Rank 2
    assert.isUndefined(board.get("a2"));
    assert.isUndefined(board.get("b2"));
    assert.isUndefined(board.get("c2"));
    assert.isUndefined(board.get("d2"));
    assert.equal(board.get("e2"), "P");
    assert.isUndefined(board.get("f2"));
    assert.equal(board.get("g2"), "P");
    assert.isUndefined(board.get("h2"));

    // Rank 3
    assert.isUndefined(board.get("a3"));
    assert.isUndefined(board.get("b3"));
    assert.isUndefined(board.get("c3"));
    assert.isUndefined(board.get("d3"));
    assert.isUndefined(board.get("e3"));
    assert.isUndefined(board.get("f3"));
    assert.isUndefined(board.get("g3"));
    assert.isUndefined(board.get("h3"));

    // Rank 4
    assert.isUndefined(board.get("a4"));
    assert.equal(board.get("b4"), "R");
    assert.isUndefined(board.get("c4"));
    assert.isUndefined(board.get("d4"));
    assert.isUndefined(board.get("e4"));
    assert.equal(board.get("f4"), "p");
    assert.isUndefined(board.get("g4"));
    assert.equal(board.get("h4"), "k");

    // Rank 5
    assert.equal(board.get("a5"), "K");
    assert.equal(board.get("b5"), "P");
    assert.isUndefined(board.get("c5"));
    assert.isUndefined(board.get("d5"));
    assert.isUndefined(board.get("e5"));
    assert.isUndefined(board.get("f5"));
    assert.isUndefined(board.get("g5"));
    assert.equal(board.get("h5"), "r");

    // Rank 6
    assert.isUndefined(board.get("a6"));
    assert.isUndefined(board.get("b6"));
    assert.isUndefined(board.get("c6"));
    assert.equal(board.get("d6"), "p");
    assert.isUndefined(board.get("e6"));
    assert.isUndefined(board.get("f6"));
    assert.isUndefined(board.get("g6"));
    assert.isUndefined(board.get("h6"));

    // Rank 7
    assert.isUndefined(board.get("a7"));
    assert.isUndefined(board.get("b7"));
    assert.equal(board.get("c7"), "p");
    assert.isUndefined(board.get("d7"));
    assert.isUndefined(board.get("e7"));
    assert.isUndefined(board.get("f7"));
    assert.isUndefined(board.get("g7"));
    assert.isUndefined(board.get("h7"));

    // Rank 8
    assert.isUndefined(board.get("a8"));
    assert.isUndefined(board.get("b8"));
    assert.isUndefined(board.get("c8"));
    assert.isUndefined(board.get("d8"));
    assert.isUndefined(board.get("e8"));
    assert.isUndefined(board.get("f8"));
    assert.isUndefined(board.get("g8"));
    assert.isUndefined(board.get("h8"));
  });

  it("side to move", () => {
    assert.equal(
      new BoardState(
        "8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 40 40"
      ).sideToMove(),
      "w"
    );

    assert.equal(
      new BoardState(
        "8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 b - - 40 40"
      ).sideToMove(),
      "b"
    );
  });
});

describe("castling rights", () => {
  it("K move", () => {
    const board = new BoardState();
    assert.include(board.fen(), "KQkq");
    assert.deepEqual(board.castlingRights(), {
      K: true,
      Q: true,
      k: true,
      q: true,
    });

    board.move("e2", "e3");
    board.move("a7", "a6");
    board.move("f1", "e2");
    board.move("b7", "b6");
    board.move("g1", "f3");
    board.move("c7", "c6");

    assert.include(board.fen(), "KQkq");

    board.move("e1", "f1");
    assert.equal(
      board.fen(),
      "rnbqkbnr/3ppppp/ppp5/8/8/4PN2/PPPPBPPP/RNBQ1K1R b kq - 1 4"
    );
    assert.deepEqual(board.castlingRights(), {
      K: false,
      Q: false,
      k: true,
      q: true,
    });
  });

  it("k move", () => {
    const board = new BoardState();
    assert.include(board.fen(), "KQkq");
    assert.deepEqual(board.castlingRights(), {
      K: true,
      Q: true,
      k: true,
      q: true,
    });

    board.move("a2", "a3");
    board.move("e7", "e6");
    board.move("b2", "b3");
    board.move("f8", "e7");
    board.move("c2", "c3");
    board.move("g8", "f6");
    board.move("d2", "d3");

    assert.include(board.fen(), "KQkq");

    board.move("e8", "f8");
    assert.equal(
      board.fen(),
      "rnbq1k1r/ppppbppp/4pn2/8/8/PPPP4/4PPPP/RNBQKBNR w KQ - 1 5"
    );
    assert.deepEqual(board.castlingRights(), {
      K: true,
      Q: true,
      k: false,
      q: false,
    });
  });

  it("queen side R move", () => {
    const board = new BoardState();
    assert.include(board.fen(), "KQkq");
    assert.deepEqual(board.castlingRights(), {
      K: true,
      Q: true,
      k: true,
      q: true,
    });

    board.move("b1", "c3");
    board.move("a7", "a6");

    assert.include(board.fen(), "KQkq");

    board.move("a1", "b1");
    assert.equal(
      board.fen(),
      "rnbqkbnr/1ppppppp/p7/8/8/2N5/PPPPPPPP/1RBQKBNR b Kkq - 1 2"
    );
    assert.deepEqual(board.castlingRights(), {
      K: true,
      Q: false,
      k: true,
      q: true,
    });
  });

  it("king side R move", () => {
    const board = new BoardState();
    assert.include(board.fen(), "KQkq");
    assert.deepEqual(board.castlingRights(), {
      K: true,
      Q: true,
      k: true,
      q: true,
    });

    board.move("g1", "f3");
    board.move("a7", "a6");

    assert.include(board.fen(), "KQkq");

    board.move("h1", "g1");
    assert.equal(
      board.fen(),
      "rnbqkbnr/1ppppppp/p7/8/8/5N2/PPPPPPPP/RNBQKBR1 b Qkq - 1 2"
    );
    assert.deepEqual(board.castlingRights(), {
      K: false,
      Q: true,
      k: true,
      q: true,
    });
  });

  it("queen side r move", () => {
    const board = new BoardState();
    assert.include(board.fen(), "KQkq");
    assert.deepEqual(board.castlingRights(), {
      K: true,
      Q: true,
      k: true,
      q: true,
    });

    board.move("a2", "a3");
    board.move("b8", "c6");
    board.move("b2", "b3");

    assert.include(board.fen(), "KQkq");

    board.move("a8", "b8");
    assert.equal(
      board.fen(),
      "1rbqkbnr/pppppppp/2n5/8/8/PP6/2PPPPPP/RNBQKBNR w KQk - 1 3"
    );
    assert.deepEqual(board.castlingRights(), {
      K: true,
      Q: true,
      k: true,
      q: false,
    });
  });

  it("king side r move", () => {
    const board = new BoardState();
    assert.include(board.fen(), "KQkq");
    assert.deepEqual(board.castlingRights(), {
      K: true,
      Q: true,
      k: true,
      q: true,
    });

    board.move("a2", "a3");
    board.move("g8", "f6");
    board.move("b2", "b3");

    assert.include(board.fen(), "KQkq");

    board.move("h8", "g8");
    assert.equal(
      board.fen(),
      "rnbqkbr1/pppppppp/5n2/8/8/PP6/2PPPPPP/RNBQKBNR w KQq - 1 3"
    );
    assert.deepEqual(board.castlingRights(), {
      K: true,
      Q: true,
      k: false,
      q: true,
    });
  });
});

describe("castling", () => {
  it("K king side", () => {
    const board = new BoardState();

    // Make space for a castle:
    board.move("e2", "e3");
    board.move("a7", "a6");
    board.move("f1", "e2");
    board.move("b7", "b6");
    board.move("g1", "f3");
    board.move("c7", "c6");

    // Castling move:
    board.move("e1", "g1");
    assert.equal(
      board.fen(),
      "rnbqkbnr/3ppppp/ppp5/8/8/4PN2/PPPPBPPP/RNBQ1RK1 b kq - 1 4"
    );
  });

  it("K queen side", () => {
    const board = new BoardState();

    // Make space for a castle:
    board.move("d2", "d3");
    board.move("a7", "a6");
    board.move("c1", "e3");
    board.move("b7", "b6");
    board.move("d1", "d2");
    board.move("c7", "c6");
    board.move("b1", "c3");
    board.move("d7", "d6");

    // Castling move:
    board.move("e1", "c1");
    assert.equal(
      board.fen(),
      "rnbqkbnr/4pppp/pppp4/8/8/2NPB3/PPPQPPPP/2KR1BNR b kq - 1 5"
    );
  });

  it("k king side", () => {
    const board = new BoardState();

    // Make space for a castle:
    board.move("a2", "a3");
    board.move("e7", "e6");
    board.move("b2", "b3");
    board.move("f8", "e7");
    board.move("c2", "c3");
    board.move("g8", "f6");
    board.move("d2", "d3");

    // Castling move:
    board.move("e8", "g8");

    assert.equal(
      board.fen(),
      "rnbq1rk1/ppppbppp/4pn2/8/8/PPPP4/4PPPP/RNBQKBNR w KQ - 1 5"
    );
  });

  it("k queen side", () => {
    const board = new BoardState();

    // Make space for a castle:
    board.move("a2", "a3");
    board.move("d7", "d6");
    board.move("b2", "b3");
    board.move("c8", "e6");
    board.move("c2", "c3");
    board.move("d8", "d7");
    board.move("d2", "d3");
    board.move("b8", "c6");
    board.move("e2", "e3");

    // Castling move:
    board.move("e8", "c8");

    assert.equal(
      board.fen(),
      "2kr1bnr/pppqpppp/2npb3/8/8/PPPPP3/5PPP/RNBQKBNR w KQ - 1 6"
    );
  });
});
