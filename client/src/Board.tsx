import { FILES, key, RANKS } from "engine/src/types";
import classes from "./Board.module.css";
import { Square } from "./Square";

export const Board = () => {
  const squares = [];
  for (const file of FILES) {
    for (const rank of RANKS) {
      squares.push(<Square key={key(file, rank)} file={file} rank={rank} />);
    }
  }

  return <div className={classes.board}>{squares}</div>;
};
