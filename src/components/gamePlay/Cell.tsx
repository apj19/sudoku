import { useGameStore } from "@/store/store";

interface CellProps {
  cellValue: number;
  xCoordinate: number;
  yCoordinate: number;
  currentSelectedCell: boolean;
  highlitedCells: boolean;
  connectedCell: boolean;
  currentTryingCell: boolean;
  currentTryingEvent: "TRY" | "PLACE" | "BACKTRACK";
}

import { memo } from "react";

function Cell({
  cellValue,
  xCoordinate,
  yCoordinate,
  currentSelectedCell,
  highlitedCells,
  connectedCell,
  currentTryingCell,
  currentTryingEvent,
}: CellProps) {
  const solvingStyle = {
    TRY: "bg-yellow-200",
    PLACE: "bg-green-200",
    BACKTRACK: "bg-red-200",
  };
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

  // console.log(xCoordinate, yCoordinate);

  return (
    //
    <>
      <div
        onClick={handleCellClick}
        className={`w-full h-full aspect-square border border-gray-300 text-center cursor-pointer caret-transparent  
                     ${currentSelectedCell ? "bg-blue-200" : ""} 
                         
                    ${highlitedCells ? "bg-blue-200" : ""} 
                    ${connectedCell ? "bg-blue-100" : ""} 
                    ${currentTryingCell ? solvingStyle[currentTryingEvent] : ""}
                         
                         
                         flex justify-center items-center`}
      >
        {cellValue == 0 ? "" : cellValue}
      </div>
    </>
  );
}

export default memo(Cell);
