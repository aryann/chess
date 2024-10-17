import { CASTLING_ROOK_MOVES } from "./castling.ts";
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

type TState = {
  move: TMove;
  capturedPiece?: TPiece;

  halfMoves: number;
  fullMoves: number;
  enPassantTarget?: TSquare;
  castlingRights: TCastlingRights;
};

export class BoardState {
  private board: Uint8Array;
  private isWhiteTurn: boolean;
  private halfMoves: number;
  private fullMoves: number;
  private enPassantTarget?: TSquare;
  private castlingRights: TCastlingRights;

  // Contains a history of all moves.
  private readonly undoStack: TState[] = [];
  private redoStack: TState[] = [];

  constructor(initialState?: string) {
    if (!initialState) {
      initialState = START_STATE;
    }

    const state = this.fromFen(initialState);
    this.board = state.board;
    this.isWhiteTurn = state.isWhiteTurn;
    this.halfMoves = state.halfMoves;
    this.fullMoves = state.fullMoves;
    this.enPassantTarget = state.enPassantTarget;
    this.castlingRights = state.castlingRights;
  }

  move(move: TMove) {
    const newState: TState = {
      move,
      halfMoves: this.halfMoves,
      fullMoves: this.fullMoves,
      enPassantTarget: this.enPassantTarget,
      castlingRights: structuredClone(this.castlingRights),
    };

    const { from, to } = move;
    const fromIndex = this.toIndex(from);
    const toIndex = this.toIndex(to);
    const piece = this.intToPiece(this.board[fromIndex]);

    if (!piece) {
      throw `${from}${to} is illegal: ${from} is empty.`;
    }

    const side = getSide(piece);
    const sideToMove = this.isWhiteTurn ? "w" : "b";
    if (side !== this.sideToMove()) {
      throw `${from}${to} is illegal: square contains ${side}, but side to move is ${sideToMove}.`;
    }

    const destinationPiece = this.intToPiece(this.board[this.toIndex(to)]);
    if (destinationPiece && side === getSide(destinationPiece)) {
      throw `${from}${to} is illegal: source and destination squares both contain ${sideToMove} pieces.`;
    }

    if (piece === "p" || piece === "P" || destinationPiece) {
      this.halfMoves = 0;
    } else {
      this.halfMoves++;
    }

    switch (move.type) {
      case "normal":
        if (this.board[toIndex] !== 0) {
          newState.capturedPiece = this.intToPiece(this.board[toIndex]);
        }

        this.board[toIndex] = this.board[fromIndex];
        break;

      case "enPassant":
        const capturedFile = getFile(to);
        const capturedRank = getRank(from);
        const capturedSquare = toSquare(capturedFile, capturedRank);
        newState.capturedPiece = this.intToPiece(
          this.board[this.toIndex(capturedSquare)]
        );
        this.board[this.toIndex(capturedSquare)] = 0;
        this.board[toIndex] = this.board[fromIndex];
        break;

      case "promotion":
        if (this.board[toIndex] !== 0) {
          newState.capturedPiece = this.intToPiece(this.board[toIndex]);
        }

        this.board[toIndex] = move.promoteTo.charCodeAt(0);
        break;

      case "castling":
        this.board[toIndex] = this.board[fromIndex];

        const rookFromIndex = this.toIndex(CASTLING_ROOK_MOVES[move.side].from);
        const rookToIndex = this.toIndex(CASTLING_ROOK_MOVES[move.side].to);
        this.board[rookToIndex] = this.board[rookFromIndex];

        this.board[fromIndex] = 0;
        this.board[rookFromIndex] = 0;

        break;
    }

    this.board[fromIndex] = 0;

    if (!this.isWhiteTurn) {
      this.fullMoves++;
    }
    this.isWhiteTurn = !this.isWhiteTurn;

    this.updateCastlingRights(from);
    this.updateEnPassant(from, to, piece);

    this.undoStack.push(newState);
    this.redoStack = [];
  }

  // Undo the last move. Returns true if and only if there was a move to undo.
  undo(): boolean {
    const state = this.undoStack.pop();
    if (!state) {
      return false;
    }

    this.redoStack.push(state);

    const { from, to } = state.move;
    const fromIndex = this.toIndex(from);
    const toIndex = this.toIndex(to);

    switch (state.move.type) {
      case "normal":
        this.board[fromIndex] = this.board[toIndex];
        if (state.capturedPiece) {
          this.board[toIndex] = state.capturedPiece.charCodeAt(0);
        } else {
          this.board[toIndex] = 0;
        }
        break;

      case "enPassant":
        this.board[fromIndex] = this.board[toIndex];

        const capturedFile = getFile(to);
        const capturedRank = getRank(from);
        const capturedSquare = toSquare(capturedFile, capturedRank);
        this.board[this.toIndex(capturedSquare)] = this.pieceToInt(
          this.isWhiteTurn ? "p" : "P"
        );
        break;

      case "promotion":
        if (state.capturedPiece) {
          this.board[toIndex] = state.capturedPiece.charCodeAt(0);
        } else {
          this.board[toIndex] = 0;
        }

        this.board[fromIndex] = this.pieceToInt(
          getSide(state.move.promoteTo) === "w" ? "P" : "p"
        );
        break;

      case "castling":
        this.board[fromIndex] = this.board[toIndex];

        const rookFromIndex = this.toIndex(
          CASTLING_ROOK_MOVES[state.move.side].from
        );
        const rookToIndex = this.toIndex(
          CASTLING_ROOK_MOVES[state.move.side].to
        );
        this.board[rookFromIndex] = this.board[rookToIndex];

        this.board[toIndex] = 0;
        this.board[rookToIndex] = 0;

        break;
    }

    this.isWhiteTurn = !this.isWhiteTurn;
    this.halfMoves = state.halfMoves;
    this.fullMoves = state.fullMoves;
    this.enPassantTarget = state.enPassantTarget;
    this.castlingRights = state.castlingRights;
    return true;
  }

  // Redo the last move.
  redo() {
    throw Error("unimplemented");
  }

  get(square: TSquare): TPiece | undefined {
    const index = this.toIndex(square);
    const val = this.board[index];
    if (val === 0) {
      return undefined;
    }
    return String.fromCharCode(this.board[index]) as TPiece;
  }

  current(): (TPiece | undefined)[] {
    const result: (TPiece | undefined)[] = [];
    for (const val of this.board) {
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

    const enPassantTarget = this.enPassantTarget ?? "-";
    const turn = this.isWhiteTurn ? "w" : "b";

    return [
      ranks.join("/"),
      turn,
      this.fenCastlingRights(),
      enPassantTarget,
      this.halfMoves,
      this.fullMoves,
    ].join(" ");
  }

  getCastlingRights(): TCastlingRights {
    return structuredClone(this.castlingRights);
  }

  getEnPassantTarget(): TSquare | undefined {
    return this.enPassantTarget;
  }

  getKingSquare(side: TSide): TSquare {
    const pieceInt = this.pieceToInt(side === "w" ? "K" : "k");
    const square = SQUARES[this.board.indexOf(pieceInt)];
    if (!square) {
      throw Error(`No king for side ${side} was found on board.`);
    }
    return square;
  }

  private fenCastlingRights(): string {
    const castlingRights = [];
    if (this.castlingRights.K) {
      castlingRights.push("K");
    }
    if (this.castlingRights.Q) {
      castlingRights.push("Q");
    }
    if (this.castlingRights.k) {
      castlingRights.push("k");
    }
    if (this.castlingRights.q) {
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
      this.castlingRights.Q = false;
    }
    if (from === "h1" || from === "e1") {
      this.castlingRights.K = false;
    }
    if (from === "a8" || from === "e8") {
      this.castlingRights.q = false;
    }
    if (from === "h8" || from === "e8") {
      this.castlingRights.k = false;
    }
  }

  private updateEnPassant(from: TSquare, to: TSquare, piece: TPiece) {
    if (piece !== "P" && piece !== "p") {
      this.enPassantTarget = undefined;
      return;
    }

    const fromRank = getRank(from);
    const toRank = getRank(to);
    if (Math.abs(fromRank - toRank) !== 2) {
      this.enPassantTarget = undefined;
      return;
    }

    const targetFile = getFile(from);
    const targetRank = getRank(from) + (toRank - fromRank) / 2;
    this.enPassantTarget = toSquare(targetFile, targetRank);
  }

  sideToMove(): TSide {
    return this.isWhiteTurn ? "w" : "b";
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

  private fromFen(fen: string) {
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

  private pieceToInt(piece: TPiece): number {
    return piece.charCodeAt(0);
  }
}
