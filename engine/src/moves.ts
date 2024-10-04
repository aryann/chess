import { BoardState } from "./board";
import { NUM_FILES, NUM_RANKS, SQUARES, TPiece, TSquare } from "./types";

enum Direction {
  Up = -8,
  UpRight = -7,
  Right = 1,
  DownRight = 9,
  Down = 8,
  DownLeft = 7,
  Left = -1,
  UpLeft = -9,
}

type SquareToEdge = { [key in Direction]: number };

export class MoveGenerator {
  private readonly board: BoardState;
  private readonly numSquaresToEdge: SquareToEdge[];

  constructor(board: BoardState) {
    this.board = board;
    this.numSquaresToEdge = this.initNumSquaresToEdge();
  }

  generateMoves(from: TSquare): TSquare[] {
    const piece = this.board.get(from);

    switch (piece) {
      case "B":
      case "b":
        return this.generateSlidingMoves(from, [
          Direction.UpRight,
          Direction.DownRight,
          Direction.DownLeft,
          Direction.UpLeft,
        ]);

      case "Q":
      case "q":
        return this.generateSlidingMoves(from, [
          Direction.Up,
          Direction.UpRight,
          Direction.Right,
          Direction.DownRight,
          Direction.Down,
          Direction.DownLeft,
          Direction.Left,
          Direction.UpLeft,
        ]);

      case "R":
      case "r":
        return this.generateSlidingMoves(from, [
          Direction.Up,
          Direction.Right,
          Direction.Down,
          Direction.Left,
        ]);

      default:
        return [];
    }
  }

  private generateSlidingMoves(
    from: TSquare,
    allowedDirections: Direction[]
  ): TSquare[] {
    const fromIndex = SQUARES.indexOf(from);
    const piece = this.board.get(from)!;

    const moves: TSquare[] = [];

    for (const dir of allowedDirections) {
      let curr = fromIndex;
      const maxMovesAllowed = this.numSquaresToEdge[fromIndex][dir];

      for (let move = 0; move < maxMovesAllowed; move++) {
        curr += dir;
        const square = SQUARES[curr];
        const destinationPiece = this.board.get(square);

        if (!destinationPiece) {
          // The next square is empty, so add it to the move set and continue.
          moves.push(square);
        } else if (this.isSame(piece, destinationPiece)) {
          // The next square has a piece of the same color as this one, so we
          // can't go any further in the current direction.
          break;
        } else {
          // The next square is the opposite color, so we can capture it.
          moves.push(square);
          break;
        }
      }
    }

    return moves;
  }

  private isSame(a: TPiece, b: TPiece): boolean {
    const aIsBlack = a === a.toLowerCase();
    const bIsBlack = b === b.toLowerCase();
    return aIsBlack === bIsBlack;
  }

  private initNumSquaresToEdge(): SquareToEdge[] {
    const result: SquareToEdge[] = [];

    for (let rank = 0; rank < NUM_RANKS; rank++) {
      for (let file = 0; file < NUM_FILES; file++) {
        const numUp = rank;
        const numRight = NUM_FILES - file - 1;
        const numDown = NUM_RANKS - rank - 1;
        const numLeft = file;

        result.push({
          [Direction.Up]: numUp,
          [Direction.UpRight]: Math.min(numUp, numRight),
          [Direction.Right]: numRight,
          [Direction.DownRight]: Math.min(numDown, numRight),
          [Direction.Down]: numDown,
          [Direction.DownLeft]: Math.min(numDown, numLeft),
          [Direction.Left]: numLeft,
          [Direction.UpLeft]: Math.min(numUp, numLeft),
        });
      }
    }

    return result;
  }
}
