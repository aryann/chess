export const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;
export const RANKS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export type TFile = (typeof FILES)[number];
export type TRank = (typeof RANKS)[number];

export class TSquare {
  public readonly file: TFile;
  public readonly rank: TRank;

  constructor(file: TFile, rank: TRank) {
    this.file = file;
    this.rank = rank;
  }

  public toString(): string {
    return `${this.file}${this.rank}`;
  }
}

export type TPiece =
  | "r"
  | "n"
  | "b"
  | "q"
  | "k"
  | "p"
  | "R"
  | "N"
  | "B"
  | "Q"
  | "K"
  | "P";

export type TBoardRank = [
  TPiece?,
  TPiece?,
  TPiece?,
  TPiece?,
  TPiece?,
  TPiece?,
  TPiece?,
  TPiece?
];

export type TBoard = [
  TBoardRank,
  TBoardRank,
  TBoardRank,
  TBoardRank,
  TBoardRank,
  TBoardRank,
  TBoardRank,
  TBoardRank
];

export type TObserver = (current: TBoard) => void;

export const key = (file: TFile, rank: TRank) => {
  return `${file}${rank}`;
};
