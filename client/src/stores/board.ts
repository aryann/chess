import { Store } from "@tanstack/react-store";
import { Engine } from "engine/src/engine";
import { TBoard } from "engine/src/types";

const engine = new Engine();

interface TBoardStore {
  board: TBoard;
}

export const boardStore = new Store<TBoardStore>({
  board: engine.current(),
});

engine.registerObserver((current: TBoard) => {
  boardStore.setState((state) => {
    return {
      ...state,
      board: current,
    };
  });
});
