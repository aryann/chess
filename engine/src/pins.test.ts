import { assert, describe, it } from "vitest";
import { BoardState } from "./board";
import { pins, TAllowedMoves } from "./pins";
import { TSquare } from "./types";

describe("pins", () => {
  it("initial state", () => {
    const board = new BoardState();

    assert.deepEqual(pins(board, "e1"), new Map<TSquare, TAllowedMoves>([]));
  });

  it("adjacent rooks", () => {
    const board = new BoardState("8/3r4/3R4/3K4/3R4/3r4/8/8 w KQkq - 0 1");

    assert.deepEqual(
      pins(board, "d5"),
      new Map<TSquare, TAllowedMoves>([
        ["d4", ["d3"]],
        ["d6", ["d7"]],
      ])
    );
  });

  it("far enemy rooks", () => {
    const board = new BoardState("3r4/8/3R4/3K4/3R4/8/8/3r4 w KQkq - 0 1");

    assert.deepEqual(
      pins(board, "d5"),
      new Map<TSquare, TAllowedMoves>([
        ["d4", ["d3", "d2", "d1"]],
        ["d6", ["d7", "d8"]],
      ])
    );
  });

  it("far friendly rooks", () => {
    const board = new BoardState("3r4/3R4/8/3K4/8/8/3R4/3r4 w KQkq - 0 1");

    assert.deepEqual(
      pins(board, "d5"),
      new Map<TSquare, TAllowedMoves>([
        ["d2", ["d4", "d3", "d1"]],
        ["d7", ["d6", "d8"]],
      ])
    );
  });

  it("adjacent rooks protecting against bishops", () => {
    const board = new BoardState("8/1b6/2R5/3K4/4R3/5b2/8/8 w KQkq - 0 1");

    assert.deepEqual(
      pins(board, "d5"),
      new Map<TSquare, TAllowedMoves>([
        ["e4", []],
        ["c6", []],
      ])
    );
  });

  it("far enemy bishop", () => {
    const board = new BoardState("K7/1R6/8/8/8/8/8/7b w KQkq - 0 1");

    assert.deepEqual(
      pins(board, "a8"),
      new Map<TSquare, TAllowedMoves>([["b7", []]])
    );
  });

  it("far friendly bishop with bishop pin", () => {
    const board = new BoardState("K7/8/8/8/8/8/6B1/7b w KQkq - 0 1");

    assert.deepEqual(
      pins(board, "a8"),
      new Map<TSquare, TAllowedMoves>([
        ["g2", ["b7", "c6", "d5", "e4", "f3", "h1"]],
      ])
    );
  });

  it("far friendly rook with bishop pin", () => {
    const board = new BoardState("K7/8/8/8/8/8/6R1/7b w KQkq - 0 1");

    assert.deepEqual(
      pins(board, "a8"),
      new Map<TSquare, TAllowedMoves>([["g2", []]])
    );
  });

  it("adjacent queens", () => {
    const board = new BoardState("8/3q4/3R4/3K4/3R4/3q4/8/8 w KQkq - 0 1");

    assert.deepEqual(
      pins(board, "d5"),
      new Map<TSquare, TAllowedMoves>([
        ["d4", ["d3"]],
        ["d6", ["d7"]],
      ])
    );
  });

  it("far enemy queen with rook pin", () => {
    const board = new BoardState("K7/1R6/8/8/8/8/8/7q w KQkq - 0 1");

    assert.deepEqual(
      pins(board, "a8"),
      new Map<TSquare, TAllowedMoves>([["b7", []]])
    );
  });

  it("far enemy queen with bishop pin", () => {
    const board = new BoardState("K7/8/8/8/8/8/6B1/7q w KQkq - 0 1");

    assert.deepEqual(
      pins(board, "a8"),
      new Map<TSquare, TAllowedMoves>([
        ["g2", ["b7", "c6", "d5", "e4", "f3", "h1"]],
      ])
    );
  });

  it("far enemy queen with rook pin", () => {
    const board = new BoardState("K7/8/8/8/8/8/6R1/7q w KQkq - 0 1");

    assert.deepEqual(
      pins(board, "a8"),
      new Map<TSquare, TAllowedMoves>([["g2", []]])
    );
  });

  it("far enemy queen with queen pin", () => {
    const board = new BoardState("K7/8/8/8/8/5Q2/8/7q w KQkq - 0 1");

    assert.deepEqual(
      pins(board, "a8"),
      new Map<TSquare, TAllowedMoves>([
        ["f3", ["b7", "c6", "d5", "e4", "g2", "h1"]],
      ])
    );
  });

  it("multiple defenders", () => {
    const board = new BoardState("3r4/3P4/3R4/3K4/3R4/3P4/8/3r4 w KQkq - 0 1");

    assert.deepEqual(pins(board, "d5"), new Map<TSquare, TAllowedMoves>([]));
  });
});
