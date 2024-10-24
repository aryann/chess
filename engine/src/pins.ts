import { BoardState } from "./board";
import {
  DOWN,
  DOWN_LEFT,
  DOWN_RIGHT,
  isInRange,
  LEFT,
  Offset,
  RIGHT,
  SLIDING_PIECE_OFFSETS,
  UP,
  UP_LEFT,
  UP_RIGHT,
} from "./offsets";
import { getSide, NUM_FILES, SQUARES, TPiece, TSquare } from "./types";

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
  const squareIndex = SQUARES.indexOf(square);

  // TODO(aryann): Rename these to row/col since they're not really rank and
  // file.
  const rank = Math.floor(squareIndex / NUM_FILES);
  const file = squareIndex % NUM_FILES;

  for (const offset of OFFSETS) {
    let newFile = file;
    let newRank = rank;

    let pinCandidate: { square: TSquare; piece: TPiece } | undefined =
      undefined;
    let allowedMoves: TSquare[] = [];
    let canMove = true;

    for (;;) {
      newFile += offset.file;
      newRank += offset.rank;

      if (!isInRange(newFile, newRank)) {
        break;
      }

      const currentSquare = SQUARES[newRank * NUM_FILES + newFile];
      const currentPiece = board.get(currentSquare);
      if (!currentPiece) {
        if (canMove) {
          allowedMoves.push(currentSquare);
        }
        continue;
      }

      if (!pinCandidate) {
        if (getSide(currentPiece) === side) {
          pinCandidate = { square: currentSquare, piece: currentPiece };
          continue;
        } else {
          // The closest sliding piece along this direction is from the other
          // side.
          break;
        }
      }

      if (getSide(currentPiece) === side) {
        canMove = false;
        continue;
      }

      for (const attackerOffset of SLIDING_PIECE_OFFSETS[currentPiece]) {
        if (
          attackerOffset.file !== offset.file ||
          attackerOffset.rank !== offset.rank
        ) {
          continue;
        }

        if (movesInSameDirection(pinCandidate.piece, attackerOffset)) {
          if (canMove) {
            allowedMoves.push(currentSquare);
          }
        } else {
          allowedMoves = [];
        }

        pins.set(pinCandidate.square, allowedMoves);

        break;
      }
    }
  }

  return pins;
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
