import { File, Rank } from "engine/src/types";
import { Piece } from "./Piece";
import classes from "./Square.module.css";
import { engine } from "./state";

interface SquareProps {
  file: File;
  rank: Rank;
}

export const Square = (props: SquareProps) => {
  const classNames = [classes.square];
  if ((props.file.charCodeAt(0) - "a".charCodeAt(0)) % 2 === props.rank % 2) {
    classNames.push(classes.black);
  } else {
    classNames.push(classes.white);
  }

  const piece = engine.getPiece(props.file, props.rank);

  return (
    <div className={classNames.join(" ")}>
      {piece && <Piece piece={piece} />}
    </div>
  );
};
