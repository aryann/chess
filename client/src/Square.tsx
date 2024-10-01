import { fileIndex, rankIndex, TFile, TRank, TSquare } from "@chess/engine";
import { useStore } from "@tanstack/react-store";
import { useDrop } from "react-dnd";
import { Piece } from "./Piece";
import classes from "./Square.module.css";
import { boardStore, engine } from "./stores/board";

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
  const to = new TSquare(props.file, props.rank);

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: "piece",
      canDrop: (from: TSquare) => engine.isLegal(from, to),
      drop: (from: TSquare) => {
        engine.move(from, to);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [engine]
  );

  const classNames = [classes.square];
  if ((props.file.charCodeAt(0) - "a".charCodeAt(0)) % 2 === props.rank % 2) {
    classNames.push(classes.black);
  } else {
    classNames.push(classes.white);
  }

  const piece = board[rankIndex(to)][fileIndex(to)];

  return (
    <div ref={drop} className={classNames.join(" ")}>
      {props.file === "a" && (
        <div className={classes.rankLabel}>{props.rank}</div>
      )}

      {props.rank === 1 && (
        <div className={classes.fileLabel}>{props.file}</div>
      )}

      {piece && <Piece piece={piece} file={props.file} rank={props.rank} />}

      {!isOver && canDrop && <PossibleMove />}
      {isOver && <div className={classes.hover}></div>}
    </div>
  );
};
