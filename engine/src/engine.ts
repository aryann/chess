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
    return this.board[rankToIndex(to.rank)][fileToIndex(to.file)] === undefined;
  }

  registerObserver(observer: TObserver) {
    this.observers.push(observer);
  }

  private emit() {
    for (const observer of this.observers) {
      observer(this.board);
    }
  }
}

export const fileToIndex = (file: TFile) => {
  return file.charCodeAt(0) - "a".charCodeAt(0);
};

export const rankToIndex = (rank: TRank) => {
  return 8 - rank;
};
