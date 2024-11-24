import { TPiece as PieceType, TSquare } from "@chess/engine";
import { useStore } from "@tanstack/react-store";
import { useEffect, useState } from "react";
import classes from "./Piece.module.css";
import { boardStore } from "./stores/board";

interface PieceProps {
  piece: PieceType;
  square?: TSquare;
}

export const Piece = (props: PieceProps) => {
  const lastEngineMove = useStore(boardStore, (state) => state.lastEngineMove);
  const [translate, setTranslate] = useState(lastEngineMove !== undefined);

  const isLower = props.piece.toLowerCase() == props.piece;
  const color = isLower ? "black" : "white";

  useEffect(() => {
    setTranslate(false);
  }, []);

  let style = {};
  if (lastEngineMove && props.square == lastEngineMove.to && translate) {
    style = {
      transform: `translate(${lastEngineMove.translateX}px, ${lastEngineMove.translateY}px)`,
    };
  }

  return (
    <img
      className={classes.piece}
      style={style}
      src={`/pieces/${color}/${props.piece}.svg`}
    />
  );
};
