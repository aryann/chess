import { BoardState } from "./board";
import { MoveGenerator } from "./moves";
import { isBlack, isWhite, SQUARES, TPiece, TSquare } from "./types";

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

  makeNextMove() {
    const moves = this.nextMoves();
    if (!moves) {
      throw "No more moves are possible";
    }
    const { from, to } = moves[Math.floor(Math.random() * moves.length)];
    this.move(from, to);
  }

  private nextMoves(): { from: TSquare; to: TSquare }[] {
    const moves: { from: TSquare; to: TSquare }[] = [];

    for (const from of SQUARES) {
      const piece = this.board.get(from);
      if (!piece) {
        continue;
      }

      if (
        (this.board.nextTurnIsWhite() && isWhite(piece)) ||
        (!this.board.nextTurnIsWhite() && isBlack(piece))
      ) {
        for (const to of this.moves(from)) {
          moves.push({ from, to });
        }
      }
    }

    return moves;
  }

  // Returns the current game state using the Forsyth–Edwards Notation (FEN).
  // For more details, see
  // https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation.
  fen(): string {
    return this.board.fen();
  }
}
