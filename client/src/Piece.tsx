import { TPiece as PieceType, TFile, TRank } from "engine/src/types";
import { DragPreviewImage, useDrag } from "react-dnd";

interface PieceProps {
  piece: PieceType;
  file: TFile;
  rank: TRank;
}

export const Piece = (props: PieceProps) => {
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: "piece",
      item: { rank: props.rank, file: props.file },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    []
  );

  const isLower = props.piece.toLowerCase() == props.piece;
  const color = isLower ? "black" : "white";

  return (
    <>
      <DragPreviewImage
        connect={preview}
        src={`/pieces/${color}/${props.piece}.svg`}
      />

      <img
        ref={drag}
        src={`/pieces/${color}/${props.piece}.svg`}
        style={{
          opacity: isDragging ? 0.5 : 1,
        }}
      />
    </>
  );
};
