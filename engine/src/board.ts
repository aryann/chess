import { NUM_FILES, NUM_RANKS, SQUARES, TPiece, TSquare } from "./types";

const START_STATE = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export class BoardState {
  private state: Uint8Array;

  constructor(fen?: string) {
    if (!fen) {
      fen = START_STATE;
    }

    this.state = this.fromFen(fen);
  }

  get(square: TSquare): TPiece | undefined {
    const index = this.toIndex(square);
    const val = this.state[index];
    if (val === 0) {
      return undefined;
    }
    return String.fromCharCode(this.state[index]) as TPiece;
  }

  isOccupied(square: TSquare): boolean {
    return this.get(square) !== undefined;
  }

  set(square: TSquare, piece: TPiece) {
    const index = this.toIndex(square);
    this.state[index] = this.pieceToInt(piece);
  }

  clear(square: TSquare) {
    const index = this.toIndex(square);
    this.state[index] = 0;
  }

  current(): (TPiece | undefined)[] {
    const result: (TPiece | undefined)[] = [];
    for (const val of this.state) {
      result.push(this.intToPiece(val));
    }
    return result;
  }

  private fromFen(fen: string): Uint8Array {
    const parts = fen.split(" ");
    if (parts.length !== 6) {
      throw `Forsyth–Edwards Notation (FEN) must have six parts: ${fen}`;
    }

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
