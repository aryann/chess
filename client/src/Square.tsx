import classes from "./Square.module.css";

interface SquareProps {
  rank: number;
  file: string;
}

export const Square = (props: SquareProps) => {
  const classNames = [classes.square];
  if (props.rank % 2 === 0) {
    classNames.push(classes.black);
  } else {
    classNames.push(classes.white);
  }

  return <div className={classNames.join(" ")}></div>;
};
