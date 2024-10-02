import { BoardState } from "./board";
import { NUM_RANKS, SQUARES, TPiece, TSquare } from "./types";

export class Engine {
  private board: BoardState = new BoardState();
  private isWhiteTurn = true;

  current(): (TPiece | undefined)[] {
    return this.board.current();
  }

  move(from: TSquare, to: TSquare) {
    if (!this.isLegal(from, to)) {
      throw `${from}${to} is illegal.`;
    }

    const fromPiece = this.board.get(from);
    if (!fromPiece) {
      throw `${from}${to} is illegal.`;
    }

    this.board.set(to, fromPiece);
    this.board.clear(from);

    this.isWhiteTurn = !this.isWhiteTurn;
  }

  isLegal(from: TSquare, to: TSquare): boolean {
    if (this.isWhiteTurn && !this.containsWhitePiece(from)) {
      return false;
    }
    if (!this.isWhiteTurn && !this.containsBlackPiece(from)) {
      return false;
    }

    return (
      this.board.get(from) !== undefined && this.board.get(to) === undefined
    );
  }

  moves(_from: string): TSquare[] {
    const result: TSquare[] = [];

    for (const square of SQUARES) {
      if (!this.board.get(square)) {
        result.push(square);
      }
    }

    return result;
  }

  // Returns the current game state using the Forsyth–Edwards Notation (FEN).
  // For more details, see
  // https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation.
  fen(): string {
    const current = this.board.current();

    const ranks = [];
    for (let rank = 0; rank < NUM_RANKS; rank++) {
      const currentRank = current.slice(
        rank * NUM_RANKS,
        rank * NUM_RANKS + NUM_RANKS
      );
      ranks.push(rankToFen(currentRank));
    }

    const turn = this.isWhiteTurn ? "w" : "b";

    // TODO: Add support for castling rights, en passant, and move counters.
    return `${ranks.join("/")} ${turn} KQkq - 0 1`;
  }

  private containsWhitePiece(square: TSquare): boolean {
    const piece = this.board.get(square);
    return !!piece && piece.toUpperCase() === piece;
  }

  private containsBlackPiece(square: TSquare): boolean {
    const piece = this.board.get(square);
    return !!piece && piece.toLowerCase() === piece;
  }
}

const rankToFen = (rank: (TPiece | undefined)[]): string => {
  const result = [];
  let emptyCount = 0;

  for (const piece of rank) {
    if (!piece) {
      emptyCount++;
      continue;
    }

    if (emptyCount > 0) {
      result.push(emptyCount);
      emptyCount = 0;
    }

    result.push(piece);
  }

  if (emptyCount > 0) {
    result.push(emptyCount);
  }
  return result.join("");
};
