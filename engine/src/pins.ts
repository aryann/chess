import { BoardState } from "./board";
import {
  DOWN,
  DOWN_LEFT,
  DOWN_RIGHT,
  LEFT,
  Offset,
  produceSquares,
  RIGHT,
  SLIDING_PIECE_OFFSETS,
  UP,
  UP_LEFT,
  UP_RIGHT,
} from "./offsets";
import { getSide, TPiece, TSquare } from "./types";

const OFFSETS = [
  UP,
  UP_RIGHT,
  RIGHT,
  DOWN_RIGHT,
  DOWN,
  DOWN_LEFT,
  LEFT,
  UP_LEFT,
];

export type TAllowedMoves = TSquare[];

export const pins = (
  board: BoardState,
  square: TSquare
): Map<TSquare, TAllowedMoves> => {
  const pins = new Map<TSquare, TAllowedMoves>();

  const piece = board.get(square);
  if (!piece) {
    return pins;
  }

  const side = getSide(piece);

  for (const offset of OFFSETS) {
    const pinnedPiece = findNextPiece(board, square, offset);
    if (!pinnedPiece) {
      // There are no pieces along this direction.
      continue;
    }

    if (getSide(pinnedPiece.piece) !== side) {
      // The next piece in this direction is an enemy piece.
      continue;
    }

    const nextPiece = findNextPiece(board, pinnedPiece.square, offset);
    if (!nextPiece) {
      // There are no additional pieces along this direction.
      continue;
    }

    if (getSide(nextPiece.piece) === side) {
      // The next piece in this direction is not an enemy piece.
      continue;
    }

    const enemyPiece = nextPiece;

    if (!movesInSameDirection(enemyPiece.piece, offset)) {
      continue;
    }

    let allowedMoves: TSquare[] = [];

    if (movesInSameDirection(pinnedPiece.piece, offset)) {
      const last = enemyPiece.square;
      allowedMoves = produceSquares(square, offset, last);

      // Do not consider the pinned piece's own square as an allowed move.
      allowedMoves.splice(allowedMoves.indexOf(pinnedPiece.square), 1);
    }

    pins.set(pinnedPiece.square, allowedMoves);
  }

  return pins;
};

const findNextPiece = (
  board: BoardState,
  start: TSquare,
  offset: Offset
): { square: TSquare; piece: TPiece } | undefined => {
  for (const square of produceSquares(start, offset)) {
    const piece = board.get(square);
    if (piece) {
      return { square, piece };
    }
  }

  return undefined;
};

const movesInSameDirection = (piece: TPiece, targetOffset: Offset): boolean => {
  for (const offset of SLIDING_PIECE_OFFSETS[piece]) {
    if (
      offset.file === targetOffset.file &&
      offset.rank === targetOffset.rank
    ) {
      return true;
    }
  }
  return false;
};
