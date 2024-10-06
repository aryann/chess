import { BoardState } from "./board";
import { MoveGenerator } from "./moves";
import { getSide, SQUARES, TPiece, TSquare } from "./types";

export class Engine {
  private board: BoardState = new BoardState();
  private readonly moveGenerator = new MoveGenerator(this.board);

  current(): (TPiece | undefined)[] {
    return this.board.current();
  }

  // Moves a piece from one square to another. Clients must use possibleMoves()
  // to ensure that the parameters passed to this function are valid. Illegal
  // moves result in an exception.
  move(from: TSquare, to: TSquare) {
    this.board.move(from, to);
  }

  // Returns the possible moves that this piece can make. There must be a
  // piece occupying the square.
  possibleMoves(from: TSquare): TSquare[] {
    return this.moveGenerator.generateMoves(from);
  }

  generateNextMove(): { from: TSquare; to: TSquare } {
    const moves = this.moves();
    if (!moves) {
      throw "No more moves are possible";
    }
    return moves[Math.floor(Math.random() * moves.length)];
  }

  // Returns all possible moves given the current game state.
  moves(): { from: TSquare; to: TSquare }[] {
    const moves: { from: TSquare; to: TSquare }[] = [];

    for (const from of SQUARES) {
      const piece = this.board.get(from);
      if (!piece || getSide(piece) !== this.board.sideToMove()) {
        continue;
      }

      for (const to of this.possibleMoves(from)) {
        moves.push({ from, to });
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
