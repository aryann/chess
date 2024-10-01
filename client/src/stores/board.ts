import { Engine, TBoard, TPiece } from "@chess/engine/src";
import { Store } from "@tanstack/react-store";
import { WritableDraft, produce } from "immer";

export const engine = new Engine();

interface TBoardStore {
  board: TBoard;
  fen: string;

  activePiece?: TPiece;
}

export const boardStore = new Store<TBoardStore>({
  board: engine.current(),
  fen: engine.fen(),
});

const setState = (recipe: (draft: WritableDraft<TBoardStore>) => void) => {
  boardStore.setState((state: TBoardStore) => {
    return produce(state, recipe);
  });
};

export const boardActions = {
  setActivePiece: (piece: TPiece) => {
    setState((state) => {
      state.activePiece = piece;
    });
  },

  clearActivePiece: () => {
    setState((state) => {
      state.activePiece = undefined;
    });
  },

  move: (from: string, to: string) => {
    engine.move(from, to);
    setState((state) => {
      state.board = engine.current();
      state.fen = engine.fen();
    });
  },
};
