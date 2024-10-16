import { assert, describe, it } from "vitest";
import { BoardState } from "./board";
import { MoveGenerator } from "./moves";
import { getSide, SQUARES, TMove } from "./types";

const visit = (
  states: number[],
  depth: number,
  board: BoardState,
  moveGenerator: MoveGenerator
) => {
  states[depth]++;

  if (depth === states.length - 1) {
    return;
  }

  const moves: TMove[] = [];
  for (const from of SQUARES) {
    const piece = board.get(from);
    if (!piece || getSide(piece) !== board.sideToMove()) {
      continue;
    }

    moves.push(...moveGenerator.generateMoves(from));
  }

  for (const move of moves) {
    board.move(move);
    visit(states, depth + 1, board, moveGenerator);
    board.undo();
  }
};

const runPerftTest = (depth: number, initialState?: string): number[] => {
  const board = new BoardState(initialState);
  const moveGenerator = new MoveGenerator(board);
  const actualStates = Array(depth).fill(0);

  visit(actualStates, 0, board, moveGenerator);
  return actualStates;
};

// See https://www.chessprogramming.org/Perft_Results for more details.
describe("perft", () => {
  it("initial position", () => {
    const expectedStates = [1, 20, 400, 8_902];
    const actualStates = runPerftTest(expectedStates.length);
    assert.deepEqual(actualStates, expectedStates);
  });

  it("position 2, aka Kiwipete", () => {
    const expectedStates: number[] = [1, 48];
    const actualStates = runPerftTest(
      expectedStates.length,
      "r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1"
    );
    assert.deepEqual(actualStates, expectedStates);
  });

  it("position 6", () => {
    const expectedStates: number[] = [1, 46];
    const actualStates = runPerftTest(
      expectedStates.length,
      "r4rk1/1pp1qppp/p1np1n2/2b1p1B1/2B1P1b1/P1NP1N2/1PP1QPPP/R4RK1 w - - 0 10"
    );
    assert.deepEqual(actualStates, expectedStates);
  });
});
