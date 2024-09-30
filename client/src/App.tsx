import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Board } from "./Board";
import { Fen } from "./Fen";

export const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Board />

      <Fen />
    </DndProvider>
  );
};
