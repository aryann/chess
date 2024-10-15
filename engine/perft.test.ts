import { expect } from "jsr:@std/expect";
import { BoardState } from "./board.ts";
import { MoveGenerator } from "./moves.ts";
import { getSide, SQUARES } from "./types.ts";

const newStates = (board: BoardState): BoardState[] => {
  const moveGenerator = new MoveGenerator(board);

  const newStates: BoardState[] = [];
  for (const from of SQUARES) {
    const piece = board.get(from);
    if (!piece || getSide(piece) !== board.sideToMove()) {
      continue;
    }

    for (const move of moveGenerator.generateMoves(from)) {
      const newState = new BoardState(board);
      newState.move(move);
      newStates.push(newState);
    }
  }

  return newStates;
};

const runPerftTest = (depth: number, initialState?: string): number[] => {
  let currentDepth = [new BoardState(initialState)];
  const actualStates = [];

  for (let i = 0; i < depth; i++) {
    const newDepth = [];
    for (const state of currentDepth) {
      newDepth.push(...newStates(state));
    }

    currentDepth = newDepth;
    actualStates.push(newDepth.length);
  }
  return actualStates;
};

// See https://www.chessprogramming.org/Perft_Results for more details.
Deno.test("perft", async (t) => {
  await t.step("initial position", () => {
    const expectedStates = [20, 400, 8_902];
    const actualStates = runPerftTest(expectedStates.length);
    expect(actualStates).toEqual(expectedStates);
  });

  await t.step("Kiwipete", () => {
    const expectedStates: number[] = [48];
    const actualStates = runPerftTest(
      expectedStates.length,
      "r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1"
    );
    expect(actualStates).toEqual(expectedStates);
  });

  await t.step("position 6", () => {
    const expectedStates: number[] = [46];
    const actualStates = runPerftTest(
      expectedStates.length,
      "r4rk1/1pp1qppp/p1np1n2/2b1p1B1/2B1P1b1/P1NP1N2/1PP1QPPP/R4RK1 w - - 0 10"
    );
    expect(actualStates).toEqual(expectedStates);
  });
});