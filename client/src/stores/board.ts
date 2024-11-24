import { Engine, TMove, TPiece, TSquare } from "@chess/engine";
import { Store } from "@tanstack/react-store";
import { WritableDraft, produce } from "immer";

export const engine = new Engine();

interface LastEngineMove {
  to: TSquare;
  translateX: number;
  translateY: number;
}

interface TBoardStore {
  board: (TPiece | undefined)[];
  fen: string;

  activePiece?: TPiece;
  lastMove?: TMove;
  lastEngineMove?: LastEngineMove;
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

    const fromDiv = document.getElementById(computerMove.from);
    const toDiv = document.getElementById(computerMove.to);

    setState((state) => {
      state.board = engine.current();
      state.fen = engine.fen();
      state.lastMove = computerMove;

      if (fromDiv && toDiv) {
        const fromRect = fromDiv.getBoundingClientRect();
        const toRect = toDiv.getBoundingClientRect();
        const translateX = fromRect.x - toRect.x;
        const translateY = fromRect.y - toRect.y;

        state.lastEngineMove = { to: computerMove.to, translateX, translateY };
      }
    });
  },
};
