import { Piece as PieceType } from "engine/src/types";

interface PieceProps {
  piece: PieceType;
}

export const Piece = (props: PieceProps) => {
  const isLower = props.piece.toLowerCase() == props.piece;
  const color = isLower ? "black" : "white";

  return <img src={`/pieces/${color}/${props.piece}.svg`} />;
};
