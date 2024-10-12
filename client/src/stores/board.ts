import { Engine, TMove, TPiece, TSquare } from "@chess/engine/src";
import { Store } from "@tanstack/react-store";
import { WritableDraft, produce } from "immer";

export const engine = new Engine();

interface TBoardStore {
  board: (TPiece | undefined)[];
  fen: string;

  activePiece?: TPiece;
  lastMove?: TMove;
  targetSquares: TSquare[];
}

export const boardStore = new Store<TBoardStore>({
  board: engine.current(),
  fen: engine.fen(),
  targetSquares: [],
});

const setState = (recipe: (draft: WritableDraft<TBoardStore>) => void) => {
  boardStore.setState((state: TBoardStore) => {
    return produce(state, recipe);
  });
};

export const boardActions = {
  setActivePiece: (square: TSquare, piece: TPiece) => {
    setState((state) => {
      state.activePiece = piece;
      const moves = engine.possibleMoves(square);
      for (const move of moves) {
        state.targetSquares.push(move.to);
      }
    });
  },

  clearActivePiece: () => {
    setState((state) => {
      state.activePiece = undefined;
      state.targetSquares = [];
    });
  },

  move: (from: TSquare, to: TSquare) => {
    const playerMove: TMove = { type: "normal", from, to };
    engine.move(playerMove);
    setState((state) => {
      state.board = engine.current();
      state.fen = engine.fen();
      state.lastMove = playerMove;
    });

    const computerMove = engine.generateNextMove();
    engine.move(computerMove);

    setState((state) => {
      state.board = engine.current();
      state.fen = engine.fen();
      state.lastMove = computerMove;
    });
  },
};
