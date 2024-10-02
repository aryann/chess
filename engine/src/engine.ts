import {
  FILES,
  key,
  RANKS,
  TBoard,
  TBoardRank,
  TPiece,
  TSquare,
} from "./types";

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
    ["r", "n", "b", "q", "k", "b", "n", "r"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    [...EMPTY_RANK],
    [...EMPTY_RANK],
    [...EMPTY_RANK],
    [...EMPTY_RANK],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["R", "N", "B", "Q", "K", "B", "N", "R"],
  ];
  private isWhiteTurn = true;

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

  move(from: TSquare | string, to: TSquare | string) {
    if (typeof from === "string") {
      from = TSquare.from(from);
    }
    if (typeof to === "string") {
      to = TSquare.from(to);
    }

    if (!this.isLegal(from, to)) {
      throw `${from}${to} is illegal.`;
    }

    this.board[rankIndex(to)][fileIndex(to)] =
      this.board[rankIndex(from)][fileIndex(from)];
    this.board[rankIndex(from)][fileIndex(from)] = undefined;

    this.isWhiteTurn = !this.isWhiteTurn;
  }

  isLegal(from: TSquare | string, to: TSquare | string): boolean {
    if (typeof from === "string") {
      from = TSquare.from(from);
    }
    if (typeof to === "string") {
      to = TSquare.from(to);
    }

    if (this.isWhiteTurn && !this.containsWhitePiece(from)) {
      return false;
    }
    if (!this.isWhiteTurn && !this.containsBlackPiece(from)) {
      return false;
    }

    return this.board[rankIndex(to)][fileIndex(to)] === undefined;
  }

  moves(_from: string): string[] {
    const result: string[] = [];

    for (const rank of RANKS) {
      for (const file of FILES) {
        const square = { rank, file };
        if (!this.board[rankIndex(square)][fileIndex(square)]) {
          // For now, we consider any empty square to be a valid move.
          result.push(key(file, rank));
        }
      }
    }

    return result;
  }

  // Returns the current game state using the Forsyth–Edwards Notation (FEN).
  // For more details, see
  // https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation.
  fen(): string {
    const ranks = [];
    for (const rank of this.board) {
      ranks.push(rankToFen(rank));
    }

    const turn = this.isWhiteTurn ? "w" : "b";

    // TODO: Add support for castling rights, en passant, and move counters.
    return `${ranks.join("/")} ${turn} KQkq - 0 1`;
  }

  private get(square: TSquare): TPiece | undefined {
    return this.board[rankIndex(square)][fileIndex(square)];
  }

  private containsWhitePiece(square: TSquare): boolean {
    const piece = this.get(square);
    return !!piece && piece.toUpperCase() === piece;
  }

  private containsBlackPiece(square: TSquare): boolean {
    const piece = this.get(square);
    return !!piece && piece.toLowerCase() === piece;
  }
}

const rankToFen = (rank: TBoardRank): string => {
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
