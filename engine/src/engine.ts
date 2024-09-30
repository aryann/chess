import { TBoard, TBoardRank, TObserver, TSquare } from "./types";

const EMPTY_RANK: TBoardRank = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];

export class Engine {
  private board: TBoard = [
    ["r", "n", "b", "q", "k", "n", "b", "r"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    [...EMPTY_RANK],
    [...EMPTY_RANK],
    [...EMPTY_RANK],
    [...EMPTY_RANK],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["R", "N", "B", "Q", "K", "N", "B", "R"],
  ];

  private observers: TObserver[] = [];

  current(): TBoard {
    const result: TBoard = [
      EMPTY_RANK,
      EMPTY_RANK,
      EMPTY_RANK,
      EMPTY_RANK,
      EMPTY_RANK,
      EMPTY_RANK,
      EMPTY_RANK,
      EMPTY_RANK,
    ];

    for (let i = 0; i < this.board.length; i++) {
      result[i] = [...this.board[i]];
    }

    return result;
  }

  move(from: TSquare, to: TSquare) {
    this.board[rankIndex(to)][fileIndex(to)] =
      this.board[rankIndex(from)][fileIndex(from)];
    this.board[rankIndex(from)][fileIndex(from)] = undefined;
    this.emit();
  }

  isLegal(from: TSquare, to: TSquare): boolean {
    return this.board[rankIndex(to)][fileIndex(to)] === undefined;
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
      observer(this.current());
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

export const fileIndex = (square: TSquare) => {
  return square.file.charCodeAt(0) - "a".charCodeAt(0);
};

export const rankIndex = (square: TSquare) => {
  return 8 - square.rank;
};
