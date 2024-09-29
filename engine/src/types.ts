export const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;
export const RANKS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export type File = (typeof FILES)[number];
export type Rank = (typeof RANKS)[number];

export const key = (file: File, rank: Rank) => {
  return `${file}${rank}`;
};
