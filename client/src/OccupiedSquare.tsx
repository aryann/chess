import { TPiece, TSquare } from "@chess/engine/src";
import { useDraggable } from "@dnd-kit/core";
import { useStore } from "@tanstack/react-store";
import { useEffect, useState } from "react";
import classes from "./OccupiedSquare.module.css";
import { Piece } from "./Piece";
import { boardStore } from "./stores/board";

interface OccupiedSquareProps {
  piece: TPiece;
  square: TSquare;
}

export const OccupiedSquare = (props: OccupiedSquareProps) => {
  const lastEngineMove = useStore(boardStore, (state) => state.lastEngineMove);
  const [includeTransform, setIncludeTransform] = useState(!!lastEngineMove);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.square,
    data: { piece: props.piece },
  });

  useEffect(() => {
    // Immediately clears the transform property on the style,
    // so the transition takes effect.
    setIncludeTransform(false);
  }, []);

  let style = {};
  if (
    lastEngineMove &&
    props.square === lastEngineMove.to &&
    includeTransform
  ) {
    style = {
      transform: `translate(${lastEngineMove.translateX}px, ${lastEngineMove.translateY}px)`,
    };
  }

  return (
    <div className={classes.pieceContainer}>
      {!transform && (
        <div
          ref={setNodeRef}
          className={classes.innerPieceContainer}
          {...listeners}
          {...attributes}
          style={style}
        >
          <Piece piece={props.piece} />
        </div>
      )}
    </div>
  );
};
