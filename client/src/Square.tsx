import { useStore } from "@tanstack/react-store";
import { fileToIndex, rankToIndex } from "engine/src/engine";
import { TFile, TRank } from "engine/src/types";
import { Piece } from "./Piece";
import classes from "./Square.module.css";
import { boardStore } from "./stores/board";

interface SquareProps {
  file: TFile;
  rank: TRank;
}

export const Square = (props: SquareProps) => {
  const board = useStore(boardStore, (state) => state.board);

  const classNames = [classes.square];
  if ((props.file.charCodeAt(0) - "a".charCodeAt(0)) % 2 === props.rank % 2) {
    classNames.push(classes.black);
  } else {
    classNames.push(classes.white);
  }

  const piece = board[fileToIndex(props.file)][rankToIndex(props.rank)];

  return (
    <div className={classNames.join(" ")}>
      {piece && <Piece piece={piece} />}
    </div>
  );
};
