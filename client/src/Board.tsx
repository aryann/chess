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
import { playMoveSound } from "./sounds";
import { Square } from "./Square";
import { boardActions, boardStore } from "./stores/board";

export const Board = () => {
  const activePiece = useStore(boardStore, (state) => state.activePiece);
  const possibleMoves = useStore(boardStore, (state) => state.moves);

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

    const to = event.over.id as TSquare;
    const moves = possibleMoves.filter((move) => move.to === to);
    if (moves.length === 0) {
      return;
    }

    // TODO(aryann): Check to see if the moves are promotion moves, and if so,
    // present the user with a choice to promote.
    boardActions.move(moves[0]);

    playMoveSound();
  };

  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className={classes.board}>{squares}</div>

      <DragOverlay>{activePiece && <Piece piece={activePiece} />}</DragOverlay>
    </DndContext>
  );
};
