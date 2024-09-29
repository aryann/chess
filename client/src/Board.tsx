import { Square } from "./Square";

export const Board = () => {
  return (
    <div>
      <Square rank={1} file="a" />
      <Square rank={2} file="a" />
    </div>
  );
};
