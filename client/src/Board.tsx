import { FILES, key, RANKS, TPiece } from "@chess/engine/src/types";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import classes from "./Board.module.css";
import { Piece } from "./Piece";
import { Square } from "./Square";
import { engine } from "./stores/board";

export const Board = () => {
  const [activePiece, setActivePiece] = useState<TPiece | null>(null);

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
    setActivePiece(piece);
  };
  const onDragEnd = (event: DragEndEvent) => {
    setActivePiece(null);
    if (!event.over) {
      return;
    }

    console.log(event);
    engine.move(event.active.id as string, event.over.id as string);
  };

  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className={classes.board}>{squares}</div>

      <DragOverlay>{activePiece && <Piece piece={activePiece} />}</DragOverlay>
    </DndContext>
  );
};
