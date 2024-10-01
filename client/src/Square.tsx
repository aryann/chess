import {
  fileIndex,
  key,
  rankIndex,
  TFile,
  TRank,
  TSquare,
} from "@chess/engine/src";
import { useDroppable } from "@dnd-kit/core";
import { useStore } from "@tanstack/react-store";
import { OccupiedSquare } from "./OccupiedSquare";
import classes from "./Square.module.css";
import { boardStore } from "./stores/board";

interface SquareProps {
  file: TFile;
  rank: TRank;
}

const PossibleMove = () => {
  return (
    <div className={classes.possibleMove}>
      <div className={classes.circle}></div>
    </div>
  );
};

export const Square = (props: SquareProps) => {
  const board = useStore(boardStore, (state) => state.board);
  const moves = useStore(boardStore, (state) => state.moves);
  const isMoveCandidate = moves.includes(key(props.file, props.rank));

  const to = new TSquare(props.file, props.rank);

  const { isOver, setNodeRef } = useDroppable({
    id: key(props.file, props.rank),
  });

  const classNames = [classes.square];
  if ((props.file.charCodeAt(0) - "a".charCodeAt(0)) % 2 === props.rank % 2) {
    classNames.push(classes.black);
  } else {
    classNames.push(classes.white);
  }

  const piece = board[rankIndex(to)][fileIndex(to)];

  return (
    <div ref={setNodeRef} className={classNames.join(" ")}>
      {props.file === "a" && (
        <div className={classes.rankLabel}>{props.rank}</div>
      )}

      {props.rank === 1 && (
        <div className={classes.fileLabel}>{props.file}</div>
      )}

      {piece && (
        <OccupiedSquare piece={piece} file={props.file} rank={props.rank} />
      )}

      {isMoveCandidate && <PossibleMove />}
      {isOver && <div className={classes.hover}></div>}
    </div>
  );
};
