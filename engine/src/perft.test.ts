import { assert, describe, it } from "vitest";
import { BoardState } from "./board";
import { MoveGenerator } from "./moves";
import { SQUARES } from "./types";

const newStates = (board: BoardState): BoardState[] => {
  const moveGenerator = new MoveGenerator(board);

  const newStates: BoardState[] = [];
  for (const from of SQUARES) {
    if (!board.currentTurn(from)) {
      continue;
    }

    for (const to of moveGenerator.generateMoves(from)) {
      const newState = board.clone();
      newState.move(from, to);
      newStates.push(newState);
    }
  }

  return newStates;
};

// See https://www.chessprogramming.org/Perft_Results for more details.
describe("perft", () => {
  it("initial position", () => {
    const expectedStates = [20];
    let currentDepth = [new BoardState()];
    const actualStates = [];

    for (const _ of expectedStates) {
      const newDepth = [];
      for (const state of currentDepth) {
        newDepth.push(...newStates(state));
      }

      currentDepth = newDepth;
      actualStates.push(newDepth.length);
    }

    assert.deepEqual(actualStates, expectedStates);
  });
});
