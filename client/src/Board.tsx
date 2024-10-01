import { FILES, key, RANKS } from "@chess/engine";
import classes from "./Board.module.css";
import { Square } from "./Square";

export const Board = () => {
  const squares = [];
  for (const rank of [...RANKS].reverse()) {
    for (const file of FILES) {
      squares.push(<Square key={key(file, rank)} file={file} rank={rank} />);
    }
  }

  return <div className={classes.board}>{squares}</div>;
};
