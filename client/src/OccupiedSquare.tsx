import { TPiece, TSquare } from "@chess/engine/src";
import { useDraggable } from "@dnd-kit/core";
import classes from "./OccupiedSquare.module.css";
import { Piece } from "./Piece";

interface OccupiedSquareProps {
  piece: TPiece;
  square: TSquare;
}

export const OccupiedSquare = (props: OccupiedSquareProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.square,
    data: { piece: props.piece },
  });

  return (
    <div className={classes.pieceContainer}>
      {!transform && (
        <div ref={setNodeRef} {...listeners} {...attributes}>
          <Piece piece={props.piece} />
        </div>
      )}
    </div>
  );
};
