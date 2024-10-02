import { TPiece } from "./types";

export class BoardState {
  private state: Uint8Array;

  constructor() {
    this.state = this.init();
  }

  get(square: string): TPiece | undefined {
    const index = this.toIndex(square);
    const val = this.state[index];
    if (val === 0) {
      return undefined;
    }
    return String.fromCharCode(this.state[index]) as TPiece;
  }

  private init(): Uint8Array {
    const rank1: TPiece[] = ["R", "N", "B", "Q", "K", "B", "N", "R"];
    const rank2: TPiece[] = ["P", "P", "P", "P", "P", "P", "P", "P"];
    const rank8: TPiece[] = ["r", "n", "b", "q", "k", "b", "n", "r"];
    const rank7: TPiece[] = ["p", "p", "p", "p", "p", "p", "p", "p"];
    const emptyRank = Array(8).fill(undefined);

    const result = new Uint8Array(
      [
        ...rank1,
        ...rank2,
        ...emptyRank,
        ...emptyRank,
        ...emptyRank,
        ...emptyRank,
        ...rank7,
        ...rank8,
      ].map(this.squareToInt)
    );

    return result;
  }

  private toIndex(square: string): number {
    if (square.length !== 2) {
      throw `illegal square value: ${square}`;
    }

    const file = square[0];
    if (file < "a" || file > "h") {
      throw `illegal file in square value: ${square}`;
    }

    const rank = parseInt(square[1]);
    if (rank < 1 || rank > 8) {
      throw `illegal rank in square value: ${square}`;
    }

    const fileIndex = file.charCodeAt(0) - "a".charCodeAt(0);
    const rankIndex = rank - 1;

    return rankIndex * 8 + fileIndex;
  }

  private squareToInt(piece?: TPiece): number {
    if (!piece) {
      return 0;
    }
    return piece.charCodeAt(0);
  }
}
