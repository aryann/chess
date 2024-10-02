import { file, rank, SQUARES, TSquare } from "@chess/engine/src";
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
  const to = props.square;

  const isMoveCandidate = moves.includes(to);

  const { isOver, setNodeRef } = useDroppable({
    id: to,
  });

  const classNames = [classes.square];
  if (
    (file(props.square).charCodeAt(0) - "a".charCodeAt(0)) % 2 !==
    rank(props.square) % 2
  ) {
    classNames.push(classes.black);
  } else {
    classNames.push(classes.white);
  }

  const piece = board[SQUARES.indexOf(props.square)];

  return (
    <div ref={setNodeRef} className={classNames.join(" ")}>
      {file(props.square) === "a" && (
        <div className={[classes.label, classes.rankLabel].join(" ")}>
          {rank(props.square)}
        </div>
      )}

      {rank(props.square) === 1 && (
        <div className={[classes.label, classes.fileLabel].join(" ")}>
          {file(props.square)}
        </div>
      )}

      {piece && <OccupiedSquare piece={piece} square={props.square} />}

      {isMoveCandidate && <PossibleMove />}
      {isOver && <div className={classes.hover}></div>}
    </div>
  );
};
