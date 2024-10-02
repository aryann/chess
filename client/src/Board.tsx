import { SQUARES, TSquare } from "@chess/engine/src/types";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { useStore } from "@tanstack/react-store";
import classes from "./Board.module.css";
import { Piece } from "./Piece";
import { Square } from "./Square";
import { boardActions, boardStore } from "./stores/board";

export const Board = () => {
  const activePiece = useStore(boardStore, (state) => state.activePiece);

  const squares = [];
  for (const square of SQUARES) {
    squares.push(<Square key={square} square={square} />);
  }

  const onDragStart = (event: DragStartEvent) => {
    const piece = event.active.data.current?.piece;
    if (!piece) {
      throw "Draggable element did not contain piece information.";
    }
    boardActions.setActivePiece(event.active.id as TSquare, piece);
  };

  const onDragEnd = (event: DragEndEvent) => {
    boardActions.clearActivePiece();
    if (!event.over) {
      return;
    }
    boardActions.move(event.active.id as TSquare, event.over.id as TSquare);
  };

  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className={classes.board}>{squares}</div>

      <DragOverlay>{activePiece && <Piece piece={activePiece} />}</DragOverlay>
    </DndContext>
  );
};
