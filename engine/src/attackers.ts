import { BoardState } from "./board";
import { ALL_SLIDING_PIECE_OFFSETS, Offset, produceSquares } from "./offsets";
import { getSide, TSide, TSquare } from "./types";

export const attackers = (board: BoardState, square: TSquare): TSquare[] => {
  const attackers: TSquare[] = [];

  const piece = board.get(square);
  if (!piece) {
    return attackers;
  }

  const side = getSide(piece);

  attackers.push(...slidingPieceAttackers(board, square, side));

  //   const index = SQUARES.indexOf(square);
  //   let file = index % NUM_FILES;
  //   let rank = Math.floor(index / NUM_FILES);

  return attackers;
};

const rookLike = (offset: Offset): boolean => {
  return Math.abs(offset.file) + Math.abs(offset.rank) === 1;
};

const bishopLike = (offset: Offset): boolean => {
  return Math.abs(offset.file) + Math.abs(offset.rank) === 2;
};

const slidingPieceAttackers = (
  board: BoardState,
  square: TSquare,
  side: TSide
): TSquare[] => {
  const attackers: TSquare[] = [];

  for (const offset of ALL_SLIDING_PIECE_OFFSETS) {
    for (const attackerSquare of produceSquares(square, offset)) {
      const attacker = board.get(attackerSquare);
      if (!attacker) {
        continue;
      }

      if (getSide(attacker) === side) {
        break;
      }

      if (
        attacker === "Q" ||
        attacker === "q" ||
        (rookLike(offset) && (attacker === "R" || attacker === "r")) ||
        (bishopLike(offset) && (attacker === "B" || attacker === "b"))
      ) {
        attackers.push(attackerSquare);
        break;
      }
    }
  }

  return attackers;
};
