import { useStore } from "@tanstack/react-store";
import classes from "./Fen.module.css";
import { boardStore } from "./stores/board";

export const Fen = () => {
  const fen = useStore(boardStore, (state) => state.fen);

  return (
    <pre className={classes.fen}>
      <code>
        {fen} (
        <a
          href="https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation"
          target="_blank"
        >
          ?
        </a>
        )
      </code>
    </pre>
  );
};
