import { FILES, key, RANKS } from "@chess/engine/src/types";
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
  for (const rank of [...RANKS].reverse()) {
    for (const file of FILES) {
      squares.push(<Square key={key(file, rank)} file={file} rank={rank} />);
    }
  }

  const onDragStart = (event: DragStartEvent) => {
    const piece = event.active.data.current?.piece;
    if (!piece) {
      throw "Draggable element did not contain piece information.";
    }
    boardActions.setActivePiece(piece);
  };

  const onDragEnd = (event: DragEndEvent) => {
    boardActions.clearActivePiece();
    if (!event.over) {
      return;
    }
    boardActions.move(event.active.id as string, event.over.id as string);
  };

  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className={classes.board}>{squares}</div>

      <DragOverlay>{activePiece && <Piece piece={activePiece} />}</DragOverlay>
    </DndContext>
  );
};
