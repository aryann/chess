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
    this.board[fileToIndex(to.file)][rankToIndex(to.rank)] =
      this.board[fileToIndex(from.file)][rankToIndex(from.rank)];
    this.board[fileToIndex(from.file)][rankToIndex(from.rank)] = undefined;
    this.emit();
  }

  isLegal(from: TSquare, to: TSquare): boolean {
    return this.board[fileToIndex(to.file)][rankToIndex(to.rank)] === undefined;
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
  return rank - 1;
};
