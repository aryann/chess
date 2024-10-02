import { SQUARES, TPiece, TSquare } from "./types";

export class BoardState {
  private state: Uint8Array;

  constructor() {
    this.state = this.init();
  }

  get(square: TSquare): TPiece | undefined {
    const index = this.toIndex(square);
    const val = this.state[index];
    if (val === 0) {
      return undefined;
    }
    return String.fromCharCode(this.state[index]) as TPiece;
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

  private init(): Uint8Array {
    const rank8: TPiece[] = ["r", "n", "b", "q", "k", "b", "n", "r"];
    const rank7: TPiece[] = ["p", "p", "p", "p", "p", "p", "p", "p"];
    const emptyRank = Array(8).fill(undefined);
    const rank2: TPiece[] = ["P", "P", "P", "P", "P", "P", "P", "P"];
    const rank1: TPiece[] = ["R", "N", "B", "Q", "K", "B", "N", "R"];

    const result = new Uint8Array(
      [
        ...rank8,
        ...rank7,
        ...emptyRank,
        ...emptyRank,
        ...emptyRank,
        ...emptyRank,
        ...rank2,
        ...rank1,
      ].map(this.pieceToInt)
    );

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
