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
  isDefaultValue: boolean;
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
  isDefaultValue,
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

  // console.log("cell rerender", xCoordinate, yCoordinate);

  return (
    //
    <>
      <div
        onClick={handleCellClick}
        className={` border border-gray-300 text-center cursor-pointer caret-transparent  
                     ${currentSelectedCell ? "bg-blue-200" : ""} 
                     ${yCoordinate === 2 || yCoordinate === 5 ? "border-r-2 border-r-foreground/50" : ""}
                     ${xCoordinate === 2 || xCoordinate === 5 ? "border-b-2 border-b-foreground/50" : ""}
                         
                    ${highlitedCells ? "bg-blue-200" : ""} 
                    ${connectedCell ? "bg-blue-100" : ""} 
                    ${currentTryingCell ? solvingStyle[currentTryingEvent] : ""}
                    ${isDefaultValue ? "" : "text-[#7091D5] font-bold"}
                         
                         
                         flex justify-center items-center`}
      >
        {cellValue == 0 ? "" : cellValue}
      </div>
    </>
  );
}

export default memo(Cell);
