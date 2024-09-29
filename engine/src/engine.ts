import { File, Piece, Rank } from "./types";

export class Engine {
  private pieces: [
    [Piece?, Piece?, Piece?, Piece?, Piece?, Piece?, Piece?, Piece?],
    [Piece?, Piece?, Piece?, Piece?, Piece?, Piece?, Piece?, Piece?],
    [Piece?, Piece?, Piece?, Piece?, Piece?, Piece?, Piece?, Piece?],
    [Piece?, Piece?, Piece?, Piece?, Piece?, Piece?, Piece?, Piece?],
    [Piece?, Piece?, Piece?, Piece?, Piece?, Piece?, Piece?, Piece?],
    [Piece?, Piece?, Piece?, Piece?, Piece?, Piece?, Piece?, Piece?],
    [Piece?, Piece?, Piece?, Piece?, Piece?, Piece?, Piece?, Piece?],
    [Piece?, Piece?, Piece?, Piece?, Piece?, Piece?, Piece?, Piece?]
  ] = [
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

  constructor() {}

  getPiece(file: File, rank: Rank): Piece | undefined {
    return this.pieces[file.charCodeAt(0) - "a".charCodeAt(0)][rank - 1];
  }
}
