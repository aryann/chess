import { BoardState } from "./board";
import { MoveGenerator } from "./moves";
import { getSide, SQUARES, TMove, TPiece, TSquare } from "./types";

export class Engine {
  private board: BoardState = new BoardState();
  private readonly moveGenerator = new MoveGenerator(this.board);

  current(): (TPiece | undefined)[] {
    return this.board.current();
  }

  // Moves a piece from one square to another. Clients must use possibleMoves()
  // to ensure that the parameters passed to this function are valid. Illegal
  // moves result in an exception.
  move(move: TMove) {
    this.board.move(move);
  }

  // Returns the possible moves that this piece can make. There must be a
  // piece occupying the square.
  possibleMoves(from: TSquare): TMove[] {
    return this.moveGenerator.generateMoves(from);
  }

  generateNextMove(): TMove {
    const moves = this.moves();
    if (!moves) {
      throw "No more moves are possible";
    }
    return moves[Math.floor(Math.random() * moves.length)];
  }

  // Returns all possible moves given the current game state.
  moves(): TMove[] {
    const moves: TMove[] = [];

    for (const from of SQUARES) {
      const piece = this.board.get(from);
      if (!piece || getSide(piece) !== this.board.sideToMove()) {
        continue;
      }

      for (const move of this.possibleMoves(from)) {
        moves.push(move);
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
