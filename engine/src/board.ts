import {
  isBlack,
  isSame,
  isWhite,
  NUM_FILES,
  NUM_RANKS,
  SQUARES,
  TPiece,
  TSquare,
} from "./types";

const START_STATE = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export class BoardState {
  private state: Uint8Array;
  private isWhiteTurn = true;
  private halfMoves = 0;
  private fullMoves = 1;

  constructor(fen?: string) {
    if (!fen) {
      fen = START_STATE;
    }

    this.state = this.fromFen(fen);
  }

  move(from: TSquare, to: TSquare) {
    if (!this.isLegal(from, to)) {
      throw `${from}${to} is illegal.`;
    }

    const fromIndex = this.toIndex(from);
    const toIndex = this.toIndex(to);
    const piece = this.intToPiece(this.state[fromIndex]);

    if (piece === "p" || piece === "P" || this.state[toIndex] !== 0) {
      this.halfMoves = 0;
    } else {
      this.halfMoves++;
    }

    this.state[toIndex] = this.state[fromIndex];
    this.state[fromIndex] = 0;

    if (!this.isWhiteTurn) {
      this.fullMoves++;
    }
    this.isWhiteTurn = !this.isWhiteTurn;
  }

  isLegal(from: TSquare, to: TSquare): boolean {
    const fromIndex = this.toIndex(from);
    const piece = this.intToPiece(this.state[fromIndex]);
    if (!piece) {
      return false;
    }

    if (this.isWhiteTurn && !isWhite(piece)) {
      return false;
    }
    if (!this.isWhiteTurn && !isBlack(piece)) {
      return false;
    }

    const destinationPiece = this.intToPiece(this.state[this.toIndex(to)]);
    return !destinationPiece || !isSame(piece, destinationPiece);
  }

  get(square: TSquare): TPiece | undefined {
    const index = this.toIndex(square);
    const val = this.state[index];
    if (val === 0) {
      return undefined;
    }
    return String.fromCharCode(this.state[index]) as TPiece;
  }

  current(): (TPiece | undefined)[] {
    const result: (TPiece | undefined)[] = [];
    for (const val of this.state) {
      result.push(this.intToPiece(val));
    }
    return result;
  }

  fen(): string {
    const current = this.current();

    const ranks = [];
    for (let rank = 0; rank < NUM_RANKS; rank++) {
      const currentRank = current.slice(
        rank * NUM_RANKS,
        rank * NUM_RANKS + NUM_RANKS
      );
      ranks.push(this.rankToFen(currentRank));
    }

    const turn = this.isWhiteTurn ? "w" : "b";

    // TODO: Add support for castling rights, en passant, and move counters.
    return `${ranks.join("/")} ${turn} KQkq - ${this.halfMoves} ${
      this.fullMoves
    }`;
  }

  private rankToFen(rank: (TPiece | undefined)[]): string {
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
  }

  private fromFen(fen: string): Uint8Array {
    const parts = fen.split(" ");
    if (parts.length !== 6) {
      throw `Forsyth–Edwards Notation (FEN) must have six parts: ${fen}`;
    }

    // TODO(aryann): Implement reading in the half move and full move counters.

    const ranks = parts[0].split("/");
    if (ranks.length !== 8) {
      throw `Forsyth–Edwards Notation (FEN) must have eight ranks: ${fen}`;
    }

    const result = new Uint8Array(NUM_FILES * NUM_RANKS);
    let square = 0;

    for (const rank of ranks) {
      for (let i = 0; i < rank.length; i++) {
        const char = rank[i].charCodeAt(0);
        if (char >= "1".charCodeAt(0) && char <= "8".charCodeAt(0)) {
          const numEmptySquares = char - "1".charCodeAt(0) + 1;
          square += numEmptySquares;
        } else {
          result[square] = char;
          square++;
        }
      }
    }

    if (square != result.length) {
      throw `Forsyth–Edwards Notation (FEN) must specify all 64 squares: ${fen}`;
    }
    return result;
  }

  private toIndex(square: TSquare): number {
    // TODO(aryann): Check the performance of finding the index through the SQUARES list.
    return SQUARES.indexOf(square);
  }

  private pieceToInt(piece?: TPiece): number {
    if (!piece) {
      return 0;
    }
    return piece.charCodeAt(0);
  }

  private intToPiece(int: number): TPiece | undefined {
    if (int === 0) {
      return undefined;
    } else {
      return String.fromCharCode(int) as TPiece;
    }
  }
}
