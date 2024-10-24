import { NUM_FILES, NUM_RANKS, TPiece } from "./types";

export type Offset = { file: number; rank: number };

export const UP: Offset = { file: 0, rank: 1 };
export const UP_RIGHT: Offset = { file: 1, rank: 1 };
export const RIGHT: Offset = { file: 1, rank: 0 };
export const DOWN_RIGHT: Offset = { file: 1, rank: -1 };
export const DOWN: Offset = { file: 0, rank: -1 };
export const DOWN_LEFT: Offset = { file: -1, rank: -1 };
export const LEFT: Offset = { file: -1, rank: 0 };
export const UP_LEFT: Offset = { file: -1, rank: 1 };

export const SLIDING_PIECE_OFFSETS: { [key in TPiece]: Offset[] } = {
  Q: [UP, UP_RIGHT, RIGHT, DOWN_RIGHT, DOWN, DOWN_LEFT, LEFT, UP_LEFT],
  q: [UP, UP_RIGHT, RIGHT, DOWN_RIGHT, DOWN, DOWN_LEFT, LEFT, UP_LEFT],
  R: [UP, RIGHT, DOWN, LEFT],
  r: [UP, RIGHT, DOWN, LEFT],
  B: [UP_RIGHT, DOWN_RIGHT, DOWN_LEFT, UP_LEFT],
  b: [UP_RIGHT, DOWN_RIGHT, DOWN_LEFT, UP_LEFT],
  p: [],
  P: [],
  n: [],
  N: [],
  k: [],
  K: [],
};

export const KNIGHT_OFFSETS: Offset[] = [
  { file: 1, rank: -2 },
  { file: 2, rank: -1 },
  { file: 2, rank: 1 },
  { file: 1, rank: 2 },
  { file: -1, rank: 2 },
  { file: -2, rank: 1 },
  { file: -2, rank: -1 },
  { file: -1, rank: -2 },
];

export const isInRange = (file: number, rank: number): boolean => {
  return file >= 0 && file < NUM_FILES && rank >= 0 && rank < NUM_RANKS;
};