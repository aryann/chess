import { Engine } from "@chess/engine/src/engine";
import { TBoard } from "@chess/engine/src/types";
import { Store } from "@tanstack/react-store";

export const engine = new Engine();

interface TBoardStore {
  board: TBoard;
  fen: string;
}

export const boardStore = new Store<TBoardStore>({
  board: engine.current(),
  fen: engine.fen(),
});

engine.registerObserver(({ board, fen }: { board: TBoard; fen: string }) => {
  console.log(fen);
  boardStore.setState((state) => {
    return {
      ...state,
      board,
      fen,
    };
  });
});
