import { useGameStore } from "@/store/store";

interface CellProps {
  cellValue: number;
  xCoordinate: number;
  yCoordinate: number;
}

export default function Cell({
  cellValue,
  xCoordinate,
  yCoordinate,
}: CellProps) {
  const setSelectedCell = useGameStore((state) => state.setSelectedCell);
  const currentSelectedCell = useGameStore((state) => state.selectedCell);
  const highlitedCells = useGameStore((state) => state.HighliteSameCell);

  return (
    <>
      <div
        onClick={() => setSelectedCell(xCoordinate, yCoordinate)}
        className={`h-7 w-7 md:w-12 md:h-12   border border-gray-300 text-center cursor-pointer caret-transparent  
                     ${
                       currentSelectedCell[0] == xCoordinate &&
                       currentSelectedCell[1] == yCoordinate
                         ? "bg-blue-200"
                         : ""
                     } 
                         
                    ${highlitedCells.has(`${xCoordinate}${yCoordinate}`) ? "bg-blue-200" : ""} 
                         
                         
                         flex justify-center items-center`}
      >
        {cellValue == 0 ? "" : cellValue}
      </div>
    </>
  );
}
