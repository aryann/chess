import { TPiece as PieceType } from "@chess/engine";
import classes from "./Piece.module.css";

interface PieceProps {
  piece: PieceType;
}

export const Piece = (props: PieceProps) => {
  const isLower = props.piece.toLowerCase() == props.piece;
  const color = isLower ? "black" : "white";

  return (
    <img
      className={classes.piece}
      src={`/pieces/${color}/${props.piece}.svg`}
    />
  );
};
