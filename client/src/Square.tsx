import { File, Rank } from "engine/src/types";
import classes from "./Square.module.css";

interface SquareProps {
  rank: Rank;
  file: File;
}

export const Square = (props: SquareProps) => {
  const classNames = [classes.square];
  if ((props.file.charCodeAt(0) - "a".charCodeAt(0)) % 2 === props.rank % 2) {
    classNames.push(classes.black);
  } else {
    classNames.push(classes.white);
  }

  return (
    <div className={classNames.join(" ")}>
      <img src="/pieces/white/K.svg"></img>
    </div>
  );
};
