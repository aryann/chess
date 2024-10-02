import { getFile, getRank, SQUARES, TSquare } from "@chess/engine/src";
import { useDroppable } from "@dnd-kit/core";
import { useStore } from "@tanstack/react-store";
import { OccupiedSquare } from "./OccupiedSquare";
import classes from "./Square.module.css";
import { boardStore } from "./stores/board";

interface SquareProps {
  square: TSquare;
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

  const isMoveCandidate = moves.includes(props.square);

  const { isOver, setNodeRef } = useDroppable({
    id: props.square,
  });

  const classNames = [classes.square];
  if (
    (getFile(props.square).charCodeAt(0) - "a".charCodeAt(0)) % 2 !==
    getRank(props.square) % 2
  ) {
    classNames.push(classes.black);
  } else {
    classNames.push(classes.white);
  }

  const piece = board[SQUARES.indexOf(props.square)];

  return (
    <div ref={setNodeRef} className={classNames.join(" ")}>
      {getFile(props.square) === "a" && (
        <div className={[classes.label, classes.rankLabel].join(" ")}>
          {getRank(props.square)}
        </div>
      )}

      {getRank(props.square) === 1 && (
        <div className={[classes.label, classes.fileLabel].join(" ")}>
          {getFile(props.square)}
        </div>
      )}

      {piece && <OccupiedSquare piece={piece} square={props.square} />}

      {isMoveCandidate && <PossibleMove />}
      {isOver && <div className={classes.hover}></div>}
    </div>
  );
};
