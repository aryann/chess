import { assert, describe, it } from "vitest";

import { attackers } from "./attackers";
import { BoardState } from "./board";

describe("attackers", () => {
  it("queens on ranks and files", () => {
    const board = new BoardState("3q4/3q4/8/8/q2K2qq/8/3q4/3q4 w KQkq - 0 1");

    assert.sameMembers(attackers(board, "d4"), ["a4", "d2", "d7", "g4"]);
  });

  it("queens on diagonals", () => {
    const board = new BoardState(
      "8/8/1q3q2/2q1q3/3K4/2q1q3/1q3q2/8 w KQkq - 0 1"
    );

    assert.sameMembers(attackers(board, "d4"), ["c3", "e3", "c5", "e5"]);
  });

  it("bishops on ranks and files", () => {
    const board = new BoardState("3b4/3b4/8/8/b2K2bb/8/3b4/3b4 w KQkq - 0 1");

    assert.sameMembers(attackers(board, "d4"), []);
  });

  it("bishops on diagonals", () => {
    const board = new BoardState(
      "8/8/1b3b2/2b1b3/3K4/2b1b3/1b3b2/8 w KQkq - 0 1"
    );

    assert.sameMembers(attackers(board, "d4"), ["c3", "e3", "c5", "e5"]);
  });

  it("rooks on ranks and files", () => {
    const board = new BoardState("3r4/3r4/8/8/r2K2rr/8/3r4/3r4 w KQkq - 0 1");

    assert.sameMembers(attackers(board, "d4"), ["a4", "d2", "d7", "g4"]);
  });

  it("rooks on diagonals", () => {
    const board = new BoardState(
      "8/8/1r3r2/2r1r3/3K4/2r1r3/1r3r2/8 w KQkq - 0 1"
    );

    assert.sameMembers(attackers(board, "d4"), []);
  });
});
