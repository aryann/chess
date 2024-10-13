import {
  getFile,
  getRank,
  getSide,
  NUM_FILES,
  NUM_RANKS,
  SQUARES,
  TCastlingRights,
  TMove,
  toSquare,
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
  enPassantTarget?: TSquare;

  castlingRights: TCastlingRights;
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

  move(move: TMove) {
    const { from, to } = move;
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

    switch (move.type) {
      case "normal":
        this.state.board[toIndex] = this.state.board[fromIndex];
        break;

      case "enPassant":
        const capturedFile = getFile(to);
        const capturedRank = getRank(from);
        const capturedSquare = toSquare(capturedFile, capturedRank);

        this.state.board[this.toIndex(capturedSquare)] = 0;
        this.state.board[toIndex] = this.state.board[fromIndex];
        break;

      case "promotion":
        this.state.board[toIndex] = move.promoteTo.charCodeAt(0);
        break;
    }

    this.state.board[fromIndex] = 0;

    if (!this.state.isWhiteTurn) {
      this.state.fullMoves++;
    }
    this.state.isWhiteTurn = !this.state.isWhiteTurn;

    this.maybeMakeCastlingMove(from, to);
    this.updateCastlingRights(from);
    this.updateEnPassant(from, to, piece);
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

    const enPassantTarget = this.state.enPassantTarget ?? "-";
    const turn = this.state.isWhiteTurn ? "w" : "b";

    return [
      ranks.join("/"),
      turn,
      this.fenCastlingRights(),
      enPassantTarget,
      this.state.halfMoves,
      this.state.fullMoves,
    ].join(" ");
  }

  castlingRights(): TCastlingRights {
    return structuredClone(this.state.castlingRights);
  }

  enPassantTarget(): TSquare | undefined {
    return this.state.enPassantTarget;
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

  private maybeMakeCastlingMove(from: TSquare, to: TSquare) {
    const fromIndex = this.toIndex(from);
    const castlingRights = this.state.castlingRights;

    if (
      (from === "e1" && to === "g1" && castlingRights.K) ||
      (from === "e8" && to === "g8" && castlingRights.k)
    ) {
      const right = fromIndex + 1;
      const rookIndex = fromIndex + 3;
      if (!this.state.board[right]) {
        this.state.board[right] = this.state.board[rookIndex];
        this.state.board[rookIndex] = 0;
      }
    }

    if (
      (from === "e1" && to === "c1" && castlingRights.Q) ||
      (from === "e8" && to === "c8" && castlingRights.q)
    ) {
      const left = fromIndex - 1;
      const rookIndex = fromIndex - 4;
      if (!this.state.board[left]) {
        this.state.board[left] = this.state.board[rookIndex];
        this.state.board[rookIndex] = 0;
      }
    }
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

  private updateEnPassant(from: TSquare, to: TSquare, piece: TPiece) {
    if (piece !== "P" && piece !== "p") {
      this.state.enPassantTarget = undefined;
      return;
    }

    const fromRank = getRank(from);
    const toRank = getRank(to);
    if (Math.abs(fromRank - toRank) !== 2) {
      this.state.enPassantTarget = undefined;
      return;
    }

    const targetFile = getFile(from);
    const targetRank = getRank(from) + (toRank - fromRank) / 2;
    this.state.enPassantTarget = toSquare(targetFile, targetRank);
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

    let enPassantTarget = parts[3] === "-" ? undefined : (parts[3] as TSquare);
    if (enPassantTarget && !SQUARES.includes(enPassantTarget)) {
      throw `Forsyth–Edwards Notation (FEN) has invalid en passant target: ${fen}`;
    }

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
      enPassantTarget,
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
