import { Engine, TPiece, TSquare } from "@chess/engine/src";
import { Store } from "@tanstack/react-store";
import { WritableDraft, produce } from "immer";

export const engine = new Engine();

interface TBoardStore {
  board: (TPiece | undefined)[];
  fen: string;

  activePiece?: TPiece;
  moves: string[];
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
      state.moves = engine.moves(square);
    });
  },

  clearActivePiece: () => {
    setState((state) => {
      state.activePiece = undefined;
      state.moves = [];
    });
  },

  move: (from: TSquare, to: TSquare) => {
    engine.move(from, to);
    setState((state) => {
      state.board = engine.current();
      state.fen = engine.fen();
    });
  },
};
