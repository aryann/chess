import { TBoard, TBoardRank, TFile, TObserver, TRank, TSquare } from "./types";

export class Engine {
  private board: TBoard = [
    ["r", "n", "b", "q", "k", "n", "b", "r"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["R", "N", "B", "Q", "K", "N", "B", "R"],
  ];

  private observers: TObserver[] = [];

  current(): TBoard {
    const emptyRank: TBoardRank = [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ];

    const result: TBoard = [
      emptyRank,
      emptyRank,
      emptyRank,
      emptyRank,
      emptyRank,
      emptyRank,
      emptyRank,
      emptyRank,
    ];

    for (let i = 0; i < this.board.length; i++) {
      result[i] = [...this.board[i]];
    }

    return result;
  }

  move(from: TSquare, to: TSquare) {
    this.board[rankToIndex(to.rank)][fileToIndex(to.file)] =
      this.board[rankToIndex(from.rank)][fileToIndex(from.file)];
    this.board[rankToIndex(from.rank)][fileToIndex(from.file)] = undefined;
    this.emit();
  }

  isLegal(from: TSquare, to: TSquare): boolean {
    console.log(from);
    return this.board[rankToIndex(to.rank)][fileToIndex(to.file)] === undefined;
  }

  registerObserver(observer: TObserver) {
    this.observers.push(observer);
  }

  // Returns the current game state using the Forsyth–Edwards Notation (FEN).
  // For more details, see
  // https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation.
  fen(): string {
    const ranks = [];
    for (const rank of this.board) {
      ranks.push(rankToFen(rank));
    }

    // TODO: Add support for turn, castling rights, en passant, and move counters.
    return `${ranks.join("/")} w KQkq - 0 1`;
  }

  private emit() {
    for (const observer of this.observers) {
      observer(this.board);
    }
  }
}

export const rankToFen = (rank: TBoardRank): string => {
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

export const fileToIndex = (file: TFile) => {
  return file.charCodeAt(0) - "a".charCodeAt(0);
};

export const rankToIndex = (rank: TRank) => {
  return 8 - rank;
};
