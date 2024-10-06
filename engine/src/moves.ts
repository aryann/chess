import { BoardState } from "./board";
import {
  getRank,
  getSide,
  NUM_FILES,
  NUM_RANKS,
  SQUARES,
  TSquare,
} from "./types";

type Offset = { file: number; rank: number };

const UP: Offset = { file: 0, rank: 1 };
const UP_RIGHT: Offset = { file: 1, rank: 1 };
const RIGHT: Offset = { file: 1, rank: 0 };
const DOWN_RIGHT: Offset = { file: 1, rank: -1 };
const DOWN: Offset = { file: 0, rank: -1 };
const DOWN_LEFT: Offset = { file: -1, rank: -1 };
const LEFT: Offset = { file: -1, rank: 0 };
const UP_LEFT: Offset = { file: -1, rank: 1 };

const KNIGHT_OFFSETS: Offset[] = [
  { file: 1, rank: -2 },
  { file: 2, rank: -1 },
  { file: 2, rank: 1 },
  { file: 1, rank: 2 },
  { file: -1, rank: 2 },
  { file: -2, rank: 1 },
  { file: -2, rank: -1 },
  { file: -1, rank: -2 },
];

export class MoveGenerator {
  private readonly board: BoardState;

  constructor(board: BoardState) {
    this.board = board;
  }

  generateMoves(from: TSquare): TSquare[] {
    const piece = this.board.get(from);

    switch (piece) {
      // White pawns
      case "P": {
        const isFirstMove = getRank(from) === 2;
        return this.generatePawnMoves(
          from,
          [DOWN_RIGHT, DOWN, DOWN_LEFT],
          isFirstMove,
          piece
        );
      }

      // Black pawns
      case "p": {
        const isFirstMove = getRank(from) === 7;
        return this.generatePawnMoves(
          from,
          [UP_LEFT, UP, UP_RIGHT],
          isFirstMove,
          piece
        );
      }

      // Bishops
      case "B":
      case "b":
        return this.generateSlidingMoves(
          from,
          [UP_RIGHT, DOWN_RIGHT, DOWN_LEFT, UP_LEFT],
          piece
        );

      // Queens
      case "Q":
      case "q":
        return this.generateSlidingMoves(
          from,
          [UP, UP_RIGHT, RIGHT, DOWN_RIGHT, DOWN, DOWN_LEFT, LEFT, UP_LEFT],
          piece
        );

      // Rooks
      case "R":
      case "r":
        return this.generateSlidingMoves(from, [UP, RIGHT, DOWN, LEFT], piece);

      // Knights
      case "N":
      case "n":
        return this.generateKnightMoves(from, piece);

      // Kings
      case "K":
      case "k":
        return this.generateKingMoves(from, piece);

      default:
        throw `Unknown piece type: ${piece}`;
    }
  }

  // Generates moves for pawns. The left, front, and right offsets are from the
  // pawn's perspective.
  private generatePawnMoves(
    from: TSquare,
    [left, front, right]: [Offset, Offset, Offset],
    isFirstMove: boolean,
    piece: "P" | "p"
  ): TSquare[] {
    const fromIndex = SQUARES.indexOf(from);
    const rank = Math.floor(fromIndex / NUM_FILES);
    const file = fromIndex % NUM_FILES;

    const moves: TSquare[] = [];

    // Front:
    const frontFile = file + front.file;
    const frontRank = rank + front.rank;
    if (this.isInRange(frontFile, frontRank)) {
      const frontSquare = SQUARES[this.toIndex(frontFile, frontRank)];
      const destinationPiece = this.board.get(frontSquare);
      if (!destinationPiece) {
        moves.push(frontSquare);

        if (isFirstMove) {
          const secondFile = frontFile + front.file;
          const secondRank = frontRank + front.rank;
          const secondSquare = SQUARES[this.toIndex(secondFile, secondRank)];
          const secondDestination = this.board.get(secondSquare);
          if (!secondDestination) {
            moves.push(secondSquare);
          }
        }
      }
    }

    // Left and right:
    for (const offset of [left, right]) {
      const newFile = file + offset.file;
      const newRank = rank + offset.rank;
      if (this.isInRange(newFile, newRank)) {
        const leftSquare = SQUARES[this.toIndex(newFile, newRank)];
        const destinationPiece = this.board.get(leftSquare);
        if (destinationPiece && getSide(piece) !== getSide(destinationPiece)) {
          moves.push(leftSquare);
        }
      }
    }

    // TODO(aryann): Add support for En Passant.

    // TODO(aryann): Add support for promotion to queen, rook, bishop, and knight.

    return moves;
  }

  private generateSlidingMoves(
    from: TSquare,
    offsets: Offset[],
    piece: "Q" | "q" | "R" | "r" | "B" | "b"
  ): TSquare[] {
    const fromIndex = SQUARES.indexOf(from);
    const rank = Math.floor(fromIndex / NUM_FILES);
    const file = fromIndex % NUM_FILES;

    const moves: TSquare[] = [];

    for (const offset of offsets) {
      let newFile = file;
      let newRank = rank;

      for (;;) {
        newFile += offset.file;
        newRank += offset.rank;

        if (!this.isInRange(newFile, newRank)) {
          break;
        }

        const square = SQUARES[newRank * NUM_FILES + newFile];
        const destinationPiece = this.board.get(square);

        if (!destinationPiece) {
          // The next square is empty, so add it to the move set and continue.
          moves.push(square);
        } else if (getSide(piece) === getSide(destinationPiece)) {
          // The next square has a piece of the same color as this one, so we
          // can't go any further in the current direction.
          break;
        } else {
          // The next square is the opposite color, so we can capture it.
          moves.push(square);
          break;
        }
      }
    }

    return moves;
  }

  private generateKnightMoves(from: TSquare, piece: "N" | "n"): TSquare[] {
    const fromIndex = SQUARES.indexOf(from);
    const rank = Math.floor(fromIndex / NUM_FILES);
    const file = fromIndex % NUM_FILES;

    const moves: TSquare[] = [];

    for (const offset of KNIGHT_OFFSETS) {
      const newRank = rank + offset.rank;
      const newFile = file + offset.file;

      if (!this.isInRange(newFile, newRank)) {
        continue;
      }

      const square = SQUARES[newRank * NUM_FILES + newFile];
      const destinationPiece = this.board.get(square);
      if (destinationPiece && getSide(piece) === getSide(destinationPiece)) {
        // There is a piece in the destination and it's of the same
        // color, so the knight can't move here.
        continue;
      }

      moves.push(square);
    }
    return moves;
  }

  private generateKingMoves(from: TSquare, piece: "K" | "k"): TSquare[] {
    const fromIndex = SQUARES.indexOf(from);
    const file = fromIndex % NUM_FILES;
    const rank = Math.floor(fromIndex / NUM_FILES);

    const moves: TSquare[] = [];
    for (const offset of [
      UP,
      UP_RIGHT,
      RIGHT,
      DOWN_RIGHT,
      DOWN,
      DOWN_LEFT,
      LEFT,
      UP_LEFT,
    ]) {
      const newFile = file + offset.file;
      const newRank = rank + offset.rank;

      if (!this.isInRange(newFile, newRank)) {
        continue;
      }

      const square = SQUARES[newRank * NUM_FILES + newFile];
      const destinationPiece = this.board.get(square);
      if (!destinationPiece || getSide(piece) !== getSide(destinationPiece)) {
        moves.push(square);
      }
    }

    const castlingRights = this.board.castlingRights();

    if (
      (from === "e1" && castlingRights.K) ||
      (from === "e8" && castlingRights.k)
    ) {
      const right = SQUARES[rank * NUM_FILES + file + 1];
      const rightRight = SQUARES[rank * NUM_FILES + file + 2];
      if (!this.board.get(right) && !this.board.get(rightRight)) {
        moves.push(rightRight);
      }
    }

    if (
      (from === "e1" && castlingRights.Q) ||
      (from === "e8" && castlingRights.q)
    ) {
      const left = SQUARES[rank * NUM_FILES + file - 1];
      const leftLeft = SQUARES[rank * NUM_FILES + file - 2];
      if (!this.board.get(left) && !this.board.get(leftLeft)) {
        moves.push(leftLeft);
      }
    }

    // TODO(aryann): Do not generate castling moves that pass through or end in
    // a check.

    return moves;
  }

  private isInRange(file: number, rank: number): boolean {
    return file >= 0 && file < NUM_FILES && rank >= 0 && rank < NUM_RANKS;
  }

  private toIndex(file: number, rank: number): number {
    return file + rank * NUM_FILES;
  }
}
