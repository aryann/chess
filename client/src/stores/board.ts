import { Engine, TMove, TPiece, TSquare } from "@chess/engine/src";
import { Store } from "@tanstack/react-store";
import { WritableDraft, produce } from "immer";

export const engine = new Engine();

interface TBoardStore {
  board: (TPiece | undefined)[];
  fen: string;

  activePiece?: TPiece;
  lastMove?: TMove;
  moves: TMove[];
}

export const boardStore = new Store<TBoardStore>({
  board: engine.current(),
  fen: engine.fen(),
  moves: [],
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
      state.moves = engine.possibleMoves(square);
    });
  },

  clearActivePiece: () => {
    setState((state) => {
      state.activePiece = undefined;
      state.moves = [];
    });
  },

  move: (move: TMove) => {
    engine.move(move);
    setState((state) => {
      state.board = engine.current();
      state.fen = engine.fen();
      state.lastMove = move;
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
