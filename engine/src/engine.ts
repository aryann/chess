import { BoardState } from "./board";
import { MoveGenerator } from "./moves";
import { TPiece, TSquare } from "./types";

export class Engine {
  private board: BoardState = new BoardState();
  private readonly moveGenerator = new MoveGenerator(this.board);

  current(): (TPiece | undefined)[] {
    return this.board.current();
  }

  move(from: TSquare, to: TSquare) {
    this.board.move(from, to);
  }

  isLegal(from: TSquare, to: TSquare): boolean {
    return this.board.isLegal(from, to);
  }

  moves(from: TSquare): TSquare[] {
    return this.moveGenerator.generateMoves(from);
  }

  // Returns the current game state using the Forsyth–Edwards Notation (FEN).
  // For more details, see
  // https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation.
  fen(): string {
    return this.board.fen();
  }
}
