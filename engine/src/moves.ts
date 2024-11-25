import { BoardState } from "./board";
import {
  DOWN,
  DOWN_LEFT,
  DOWN_RIGHT,
  isInRange,
  KNIGHT_OFFSETS,
  LEFT,
  Offset,
  OFFSETS,
  produceSquares,
  RIGHT,
  UP,
  UP_LEFT,
  UP_RIGHT,
} from "./offsets";
import { pins } from "./pins";
import {
  getRank,
  getSide,
  NUM_FILES,
  SQUARES,
  TMove,
  TPiece,
  TSquare,
} from "./types";

export class MoveGenerator {
  private readonly board: BoardState;

  constructor(board: BoardState) {
    this.board = board;
  }

  generateAllMoves(): TMove[] {
    const moves: TMove[] = [];

    for (const from of SQUARES) {
      const piece = this.board.get(from);
      if (!piece || getSide(piece) !== this.board.sideToMove()) {
        continue;
      }

      moves.push(...this.generateMoves(from));
    }

    return moves;
  }

  generateMoves(from: TSquare): TMove[] {
    const piece = this.board.get(from);
    if (!piece) {
      throw Error(`Square ${from} is empty.`);
    }

    const side = getSide(piece);

    const kingSquare = this.board.getKingSquare(side);
    let pinnedPieces = pins(this.board, kingSquare);

    const moves: TMove[] = [];

    for (const move of this.generatePseudoLegalMoves(from)) {
      const pinnedPiece = pinnedPieces.get(move.from);
      if (pinnedPiece && !pinnedPiece.includes(move.to)) {
        // Pinned pieces cannot be moved.
        continue;
      }

      // TODO(aryann): If the king is currently in check, exclude all moves that
      // do not take the king out of check.

      // TODO(aryann): Disallow other moves that place the king in a check.

      moves.push(move);
    }

    return moves;
  }

  private generatePseudoLegalMoves(from: TSquare): TMove[] {
    const piece = this.board.get(from);

    switch (piece) {
      // Pawns
      case "P":
      case "p": {
        const startingRank = piece === "P" ? 2 : 7;
        const isFirstMove = getRank(from) === startingRank;
        return this.generatePawnMoves(from, OFFSETS[piece], isFirstMove, piece);
      }

      // Bishops
      case "B":
      case "b":

      // Queens
      case "Q":
      case "q":

      // Rooks
      case "R":
      case "r":
        return this.generateSlidingMoves(from, piece);

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

  private moveOrPromotePawn(
    from: TSquare,
    to: TSquare,
    piece: "P" | "p"
  ): TMove[] {
    const isPromotion = getRank(to) === 1 || getRank(to) === 8;
    if (!isPromotion) {
      return [{ type: "normal", from, to }];
    }

    const moves: TMove[] = [];
    const promotionPieces: TPiece[] =
      getSide(piece) === "w" ? ["Q", "R", "B", "N"] : ["q", "r", "b", "n"];

    for (const promoteTo of promotionPieces) {
      moves.push({ type: "promotion", from, to, promoteTo });
    }
    return moves;
  }

  // Generates moves for pawns. The left, front, and right offsets are from the
  // pawn's perspective.
  private generatePawnMoves(
    from: TSquare,
    [left, front, right]: Offset[],
    isFirstMove: boolean,
    piece: "P" | "p"
  ): TMove[] {
    const fromIndex = SQUARES.indexOf(from);
    const rank = Math.floor(fromIndex / NUM_FILES);
    const file = fromIndex % NUM_FILES;

    const moves: TMove[] = [];

    // Front:
    const frontFile = file + front.file;
    const frontRank = rank + front.rank;
    if (isInRange(frontFile, frontRank)) {
      const frontSquare = SQUARES[this.toIndex(frontFile, frontRank)];
      const destinationPiece = this.board.get(frontSquare);
      if (!destinationPiece) {
        moves.push(...this.moveOrPromotePawn(from, frontSquare, piece));

        if (isFirstMove) {
          const secondFile = frontFile + front.file;
          const secondRank = frontRank + front.rank;
          const secondSquare = SQUARES[this.toIndex(secondFile, secondRank)];
          const secondDestination = this.board.get(secondSquare);
          if (!secondDestination) {
            moves.push({ type: "normal", from, to: secondSquare });
          }
        }
      }
    }

    // Left and right:
    for (const offset of [left, right]) {
      const newFile = file + offset.file;
      const newRank = rank + offset.rank;
      if (isInRange(newFile, newRank)) {
        const to = SQUARES[this.toIndex(newFile, newRank)];
        const destinationPiece = this.board.get(to);

        if (destinationPiece && getSide(piece) !== getSide(destinationPiece)) {
          moves.push(...this.moveOrPromotePawn(from, to, piece));
        }

        const enPassantTarget = this.board.getEnPassantTarget();
        if (enPassantTarget === to) {
          moves.push({ type: "enPassant", from, to });
        }
      }
    }

    return moves;
  }

  private generateSlidingMoves(
    from: TSquare,
    piece: "Q" | "q" | "R" | "r" | "B" | "b"
  ): TMove[] {
    const offsets = OFFSETS[piece];
    const moves: TMove[] = [];

    for (const offset of offsets) {
      for (const to of produceSquares(from, offset)) {
        const destinationPiece = this.board.get(to);
        const move: TMove = { type: "normal", from, to };

        if (!destinationPiece) {
          // The next square is empty, so add it to the move set and continue.
          moves.push(move);
        } else if (getSide(piece) === getSide(destinationPiece)) {
          // The next square has a piece of the same color as this one, so we
          // can't go any further in the current direction.
          break;
        } else {
          // The next square is the opposite color, so we can capture it.
          moves.push(move);
          break;
        }
      }
    }

    return moves;
  }

  private generateKnightMoves(from: TSquare, piece: "N" | "n"): TMove[] {
    const moves: TMove[] = [];

    for (const offset of KNIGHT_OFFSETS) {
      const squares = produceSquares(from, offset);
      if (squares.length !== 1) {
        continue;
      }
      const to = squares[0];

      const destinationPiece = this.board.get(to);
      if (destinationPiece && getSide(piece) === getSide(destinationPiece)) {
        // There is a piece in the destination and it's of the same
        // color, so the knight can't move here.
        continue;
      }

      moves.push({ type: "normal", from, to });
    }
    return moves;
  }

  private generateKingMoves(from: TSquare, piece: "K" | "k"): TMove[] {
    const fromIndex = SQUARES.indexOf(from);
    const file = fromIndex % NUM_FILES;
    const rank = Math.floor(fromIndex / NUM_FILES);

    const moves: TMove[] = [];
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

      if (!isInRange(newFile, newRank)) {
        continue;
      }

      const to = SQUARES[newRank * NUM_FILES + newFile];
      const destinationPiece = this.board.get(to);
      if (!destinationPiece || getSide(piece) !== getSide(destinationPiece)) {
        moves.push({ type: "normal", from, to });
      }
    }

    const castlingRights = this.board.getCastlingRights();

    if (
      (from === "e1" && castlingRights.K) ||
      (from === "e8" && castlingRights.k)
    ) {
      const right = SQUARES[rank * NUM_FILES + file + 1];
      const rightRight = SQUARES[rank * NUM_FILES + file + 2];
      if (!this.board.get(right) && !this.board.get(rightRight)) {
        moves.push({
          type: "castling",
          from,
          to: rightRight,
          side: getSide(piece) === "w" ? "K" : "k",
        });
      }
    }

    if (
      (from === "e1" && castlingRights.Q) ||
      (from === "e8" && castlingRights.q)
    ) {
      const left = SQUARES[rank * NUM_FILES + file - 1];
      const leftLeft = SQUARES[rank * NUM_FILES + file - 2];
      if (!this.board.get(left) && !this.board.get(leftLeft)) {
        moves.push({
          type: "castling",
          from,
          to: leftLeft,
          side: getSide(piece) === "w" ? "Q" : "q",
        });
      }
    }

    // TODO(aryann): Do not generate castling moves that pass through or end in
    // a check.

    return moves;
  }

  private toIndex(file: number, rank: number): number {
    return file + rank * NUM_FILES;
  }
}
