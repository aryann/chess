import classes from "./App.module.css";
import { Board } from "./Board";
import { Fen } from "./Fen";

export const App = () => {
  return (
    <div className={classes.container}>
      <Board />
      <Fen />
    </div>
  );
};
