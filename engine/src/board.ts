import {
  getSide,
  NUM_FILES,
  NUM_RANKS,
  SQUARES,
  TPiece,
  TSide,
  TSquare,
} from "./types";

const START_STATE = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

type State = {
  board: Uint8Array;
  isWhiteTurn: boolean;
  halfMoves: number;
  fullMoves: number;

  castlingRights: {
    K: boolean;
    k: boolean;
    Q: boolean;
    q: boolean;
  };
};

export class BoardState {
  // We wrap all state in a pure data object, so we can use structuredClone() to
  // quickly make copies of the board state.
  private readonly state: State;

  constructor(initialState?: string | BoardState) {
    if (!initialState) {
      this.state = this.fromFen(START_STATE);
    } else if (typeof initialState === "string") {
      this.state = this.fromFen(initialState);
    } else if (typeof initialState === "object") {
      this.state = structuredClone(initialState.state);
    } else {
      throw "initialState must be a Forsyth–Edwards Notation (FEN) or an existing BoardState.";
    }
  }

  move(from: TSquare, to: TSquare) {
    const fromIndex = this.toIndex(from);
    const toIndex = this.toIndex(to);
    const piece = this.intToPiece(this.state.board[fromIndex]);

    if (!piece) {
      throw `${from}${to} is illegal: ${from} is empty.`;
    }

    const side = getSide(piece);
    const sideToMove = this.state.isWhiteTurn ? "white" : "black";
    if (side !== this.sideToMove()) {
      throw `${from}${to} is illegal: square contains ${side}, but side to move is ${sideToMove}.`;
    }

    const destinationPiece = this.intToPiece(
      this.state.board[this.toIndex(to)]
    );
    if (destinationPiece && side === getSide(destinationPiece)) {
      throw `${from}${to} is illegal: source and destination squares both contain ${sideToMove} pieces.`;
    }

    if (piece === "p" || piece === "P" || destinationPiece) {
      this.state.halfMoves = 0;
    } else {
      this.state.halfMoves++;
    }

    this.updateCastlingRights(from);

    this.state.board[toIndex] = this.state.board[fromIndex];
    this.state.board[fromIndex] = 0;

    if (!this.state.isWhiteTurn) {
      this.state.fullMoves++;
    }
    this.state.isWhiteTurn = !this.state.isWhiteTurn;
  }

  get(square: TSquare): TPiece | undefined {
    const index = this.toIndex(square);
    const val = this.state.board[index];
    if (val === 0) {
      return undefined;
    }
    return String.fromCharCode(this.state.board[index]) as TPiece;
  }

  current(): (TPiece | undefined)[] {
    const result: (TPiece | undefined)[] = [];
    for (const val of this.state.board) {
      result.push(this.intToPiece(val));
    }
    return result;
  }

  fen(): string {
    const current = this.current();

    const ranks = [];
    for (let rank = 0; rank < NUM_RANKS; rank++) {
      const currentRank = current.slice(
        rank * NUM_RANKS,
        rank * NUM_RANKS + NUM_RANKS
      );
      ranks.push(this.rankToFen(currentRank));
    }

    const turn = this.state.isWhiteTurn ? "w" : "b";

    // TODO: Add support for castling rights, en passant, and move counters.
    return `${ranks.join("/")} ${turn} ${this.fenCastlingRights()} - ${
      this.state.halfMoves
    } ${this.state.fullMoves}`;
  }

  castlingRights() {
    return structuredClone(this.state.castlingRights);
  }

  private fenCastlingRights(): string {
    const castlingRights = [];
    if (this.state.castlingRights.K) {
      castlingRights.push("K");
    }
    if (this.state.castlingRights.Q) {
      castlingRights.push("Q");
    }
    if (this.state.castlingRights.k) {
      castlingRights.push("k");
    }
    if (this.state.castlingRights.q) {
      castlingRights.push("q");
    }
    if (castlingRights.length === 0) {
      return "-";
    }

    return castlingRights.join("");
  }

  // Updates the castling rights. This function assumes that the move has
  // already been determined to be valid.
  private updateCastlingRights(from: TSquare) {
    if (from === "a1" || from === "e1") {
      this.state.castlingRights.Q = false;
    }
    if (from === "h1" || from === "e1") {
      this.state.castlingRights.K = false;
    }
    if (from === "a8" || from === "e8") {
      this.state.castlingRights.q = false;
    }
    if (from === "h8" || from === "e8") {
      this.state.castlingRights.k = false;
    }
  }

  sideToMove(): TSide {
    return this.state.isWhiteTurn ? "w" : "b";
  }

  private rankToFen(rank: (TPiece | undefined)[]): string {
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
  }

  private fromFen(fen: string): State {
    const parts = fen.split(" ");
    if (parts.length !== 6) {
      throw `Forsyth–Edwards Notation (FEN) must have six parts: ${fen}`;
    }

    const turn = parts[1];
    if (turn !== "w" && turn !== "b") {
      throw `Forsyth–Edwards Notation (FEN) has invalid side to move: ${fen}`;
    }
    const isWhiteTurn = turn === "w";

    const castlingRights = parts[2];

    const halfMoves = parseInt(parts[4]);
    if (Number.isNaN(halfMoves) || halfMoves < 0) {
      throw `Forsyth–Edwards Notation (FEN) has invalid half moves: ${fen}`;
    }

    const fullMoves = parseInt(parts[5]);
    if (Number.isNaN(fullMoves) || fullMoves < 1) {
      throw `Forsyth–Edwards Notation (FEN) has invalid full moves: ${fen}`;
    }

    const ranks = parts[0].split("/");
    if (ranks.length !== 8) {
      throw `Forsyth–Edwards Notation (FEN) must have eight ranks: ${fen}`;
    }

    const board = new Uint8Array(NUM_FILES * NUM_RANKS);
    let square = 0;

    for (const rank of ranks) {
      for (let i = 0; i < rank.length; i++) {
        const char = rank[i].charCodeAt(0);
        if (char >= "1".charCodeAt(0) && char <= "8".charCodeAt(0)) {
          const numEmptySquares = char - "1".charCodeAt(0) + 1;
          square += numEmptySquares;
        } else {
          board[square] = char;
          square++;
        }
      }
    }

    if (square != board.length) {
      throw `Forsyth–Edwards Notation (FEN) must specify all 64 squares: ${fen}`;
    }

    return {
      board,
      isWhiteTurn,
      halfMoves,
      fullMoves,
      castlingRights: {
        K: castlingRights.includes("K"),
        Q: castlingRights.includes("Q"),
        k: castlingRights.includes("k"),
        q: castlingRights.includes("q"),
      },
    };
  }

  private toIndex(square: TSquare): number {
    // TODO(aryann): Check the performance of finding the index through the
    // SQUARES list.
    return SQUARES.indexOf(square);
  }

  private intToPiece(int: number): TPiece | undefined {
    if (int === 0) {
      return undefined;
    } else {
      return String.fromCharCode(int) as TPiece;
    }
  }
}
