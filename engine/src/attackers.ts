import { BoardState } from "./board";
import {
  ALL_SLIDING_PIECE_OFFSETS,
  KNIGHT_OFFSETS,
  Offset,
  produceSquares,
} from "./offsets";
import { getSide, TSide, TSquare } from "./types";

export const attackers = (board: BoardState, square: TSquare): TSquare[] => {
  const attackers: TSquare[] = [];

  const piece = board.get(square);
  if (!piece) {
    return attackers;
  }

  const side = getSide(piece);

  attackers.push(...slidingPieceAttackers(board, square, side));
  attackers.push(...knightAttackers(board, square, side));

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

const knightAttackers = (
  board: BoardState,
  square: TSquare,
  side: TSide
): TSquare[] => {
  const attackers: TSquare[] = [];

  for (const offset of KNIGHT_OFFSETS) {
    const squares = produceSquares(square, offset);
    if (squares.length !== 1) {
      continue;
    }
    const attackerSquare = squares[0];
    const attacker = board.get(attackerSquare);
    if (!attacker) {
      continue;
    }

    if (getSide(attacker) === side) {
      break;
    }

    if (attacker === "N" || attacker === "n") {
      attackers.push(attackerSquare);
    }
  }

  return attackers;
};
