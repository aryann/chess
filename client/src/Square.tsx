import { getFile, getRank, SQUARES, TMove, TSquare } from "@chess/engine";
import { useDroppable } from "@dnd-kit/core";
import { useStore } from "@tanstack/react-store";
import { OccupiedSquare } from "./OccupiedSquare";
import classes from "./Square.module.css";
import { boardStore } from "./stores/board";

interface SquareProps {
  square: TSquare;
}

export const Square = (props: SquareProps) => {
  const board = useStore(boardStore, (state) => state.board);
  const isMoveCandidate =
    useStore(boardStore, (state) =>
      state.moves.filter((move: TMove) => move.to === props.square)
    ).length > 0;

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
    <div ref={setNodeRef} id={props.square} className={classNames.join(" ")}>
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
      {isOver && <div className={classes.highlight}></div>}

      <LastMoveHighlight square={props.square} />
    </div>
  );
};

const PossibleMove = () => {
  return (
    <div className={classes.possibleMove}>
      <div className={classes.circle}></div>
    </div>
  );
};

interface LastMoveHighlightProps {
  square: TSquare;
}

const LastMoveHighlight = (props: LastMoveHighlightProps) => {
  const lastMove = useStore(boardStore, (state) => state.lastMove);

  if (!lastMove) {
    return <></>;
  }

  if (lastMove.to !== props.square && lastMove.from !== props.square) {
    return <></>;
  }

  return <div className={classes.highlight}></div>;
};
