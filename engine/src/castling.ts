import { TCastlingSides, TSquare } from "./types";

export const CASTLING_ROOK_MOVES: {
  [key in TCastlingSides]: { from: TSquare; to: TSquare };
} = {
  K: { from: "h1", to: "f1" },
  Q: { from: "a1", to: "d1" },
  k: { from: "h8", to: "f8" },
  q: { from: "a8", to: "d8" },
};
