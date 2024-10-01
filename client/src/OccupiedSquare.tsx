import { key, TPiece as PieceType, TFile, TRank } from "@chess/engine/src";
import { useDraggable } from "@dnd-kit/core";
import classes from "./OccupiedSquare.module.css";
import { Piece } from "./Piece";

interface OccupiedSquareProps {
  piece: PieceType;
  file: TFile;
  rank: TRank;
}

export const OccupiedSquare = (props: OccupiedSquareProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: key(props.file, props.rank),
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
