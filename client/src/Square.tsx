import { useStore } from "@tanstack/react-store";
import { fileToIndex, rankToIndex } from "engine/src/engine";
import { TFile, TRank, TSquare } from "engine/src/types";
import { useDrop } from "react-dnd";
import { Piece } from "./Piece";
import classes from "./Square.module.css";
import { boardStore, engine } from "./stores/board";

interface SquareProps {
  file: TFile;
  rank: TRank;
}

export const Square = (props: SquareProps) => {
  const board = useStore(boardStore, (state) => state.board);

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: "piece",
      canDrop: () => true,
      drop: (from: TSquare) => {
        const to = { file: props.file, rank: props.rank };
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

  if (canDrop) {
    classNames.push(classes.highlight);
  }

  const piece = board[fileToIndex(props.file)][rankToIndex(props.rank)];

  return (
    <div ref={drop} className={classNames.join(" ")}>
      {piece && <Piece piece={piece} file={props.file} rank={props.rank} />}
    </div>
  );
};
