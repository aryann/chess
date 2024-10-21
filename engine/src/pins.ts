import { BoardState } from "./board";
import {
  DOWN,
  DOWN_LEFT,
  DOWN_RIGHT,
  isInRange,
  LEFT,
  RIGHT,
  SLIDING_PIECE_OFFSETS,
  UP,
  UP_LEFT,
  UP_RIGHT,
} from "./offsets";
import { getSide, NUM_FILES, SQUARES, TSquare } from "./types";

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

export const pins = (board: BoardState, square: TSquare): TSquare[] => {
  const pins: TSquare[] = [];
  const piece = board.get(square);
  if (!piece) {
    return [];
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

    let pinCandidate: TSquare | undefined = undefined;
    for (;;) {
      newFile += offset.file;
      newRank += offset.rank;

      if (!isInRange(newFile, newRank)) {
        break;
      }

      const currentSquare = SQUARES[newRank * NUM_FILES + newFile];
      const currentPiece = board.get(currentSquare);
      if (!currentPiece) {
        continue;
      }

      if (!pinCandidate) {
        if (getSide(currentPiece) === side) {
          pinCandidate = currentSquare;
          continue;
        } else {
          // The closest sliding piece along this direction is from the other
          // side.
          break;
        }
      }

      if (getSide(currentPiece) !== side) {
        if (
          currentPiece != "Q" &&
          currentPiece != "q" &&
          currentPiece != "R" &&
          currentPiece != "r" &&
          currentPiece != "B" &&
          currentPiece != "b"
        ) {
          break;
        }

        for (const pieceOffset of SLIDING_PIECE_OFFSETS[currentPiece]) {
          if (
            pieceOffset.file === offset.file &&
            pieceOffset.rank === offset.rank
          ) {
            pins.push(pinCandidate);
            break;
          }
        }
      }
    }
  }

  return pins;
};
