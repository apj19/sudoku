
import { useGameStore } from "@/store/store";

interface CellProps {
  cellValue: number;
  xCoordinate: number;
  yCoordinate: number;
  currentSelectedCell: boolean;
  highlitedCells: boolean;
  connectedCell: boolean;
}

import { memo } from "react";

function Cell({
  cellValue,
  xCoordinate,
  yCoordinate,
  currentSelectedCell,
  highlitedCells,
  connectedCell,
}: CellProps) {
  //subscribed to action will not cause re render
  const setSelectedCell = useGameStore((state) => state.setSelectedCell);
  const updatedConnectCells = useGameStore((state) => state.updateConnectCell);
  const updateHighliteCells = useGameStore(
    (state) => state.updateHighliteSameCell,
  );

  function handleCellClick() {
    setSelectedCell(xCoordinate, yCoordinate);

    updatedConnectCells(xCoordinate, yCoordinate);

    updateHighliteCells(cellValue);
  }

  console.log(xCoordinate, yCoordinate);

  return (
    <>
      <div
        onClick={handleCellClick}
        className={`h-7 w-7 md:w-12 md:h-12   border border-gray-200 text-center cursor-pointer caret-transparent  
                     ${currentSelectedCell ? "bg-blue-200" : ""} 
                         
                    ${highlitedCells ? "bg-blue-200" : ""} 
                    ${connectedCell ? "bg-blue-100" : ""} 
                         
                         
                         flex justify-center items-center`}
      >
        {cellValue == 0 ? "" : cellValue}
      </div>
    </>
  );
}

export default memo(Cell);
