import { TBoard, TBoardRank, TFile, TObserver, TRank } from "./types";

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

  registerObserver(observer: TObserver) {
    this.observers.push(observer);
  }
}

export const fileToIndex = (file: TFile) => {
  return file.charCodeAt(0) - "a".charCodeAt(0);
};

export const rankToIndex = (rank: TRank) => {
  return rank - 1;
};
