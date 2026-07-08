import { useGameStore } from "@/store/store";

interface CellProps {
  cellValue: number;
  xCoordinate: number;
  yCoordinate: number;
  currentSelectedCell: boolean;
  highlitedCells: boolean;
  connectedCell: boolean;
  isDefaultValue: boolean;
  isWrongCellValue: boolean;
  notes: number[];
  isErrorCell: boolean;
}

import { memo } from "react";
import BaseCell from "../BaseCell";

function GameCell({
  cellValue,
  xCoordinate,
  yCoordinate,
  currentSelectedCell,
  highlitedCells,
  connectedCell,
  isDefaultValue,
  isWrongCellValue,
  notes,
  isErrorCell,
}: CellProps) {
  // const solvingStyle = {
  //   TRY: "bg-yellow-200",
  //   PLACE: "bg-green-200",
  //   BACKTRACK: "bg-red-200",
  // };
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

  function generateBackgrodCssFromProps(): string {
    let res: string = "";

    if (currentSelectedCell) {
      res = res + " " + "bg-blue-200";
    }

    if (isErrorCell) {
      res = res + " " + " animate-border-flash ";
    }

    if (highlitedCells) {
      res = res + " " + "bg-blue-200";
    }

    if (connectedCell) {
      res = res + " " + "bg-blue-100";
    }

    if (!isDefaultValue) {
      res = res + " " + "text-[#7091D5] font-bold";
    }

    if (isWrongCellValue) {
      res = res + " " + "bg-red-100 text-red-500";
    }

    return res;
  }

  // console.log("cell rerender", xCoordinate, yCoordinate);

  return (
    //
    <>
      <BaseCell
        onClick={handleCellClick}
        cellValue={cellValue}
        xCoordinate={xCoordinate}
        yCoordinate={yCoordinate}
        bgColor={generateBackgrodCssFromProps()}
        notes={notes}
      ></BaseCell>
      {/* <div
        onClick={handleCellClick}
        className={` border border-gray-300 text-center cursor-pointer caret-transparent  
                     ${currentSelectedCell ? "bg-blue-200" : ""} 
                     ${yCoordinate === 2 || yCoordinate === 5 ? "border-r-2 border-r-foreground/50" : ""}
                     ${xCoordinate === 2 || xCoordinate === 5 ? "border-b-2 border-b-foreground/50" : ""}
                         
                    ${highlitedCells ? "bg-blue-200" : ""} 
                    ${connectedCell ? "bg-blue-100" : ""} 
                    ${currentTryingCell ? solvingStyle[currentTryingEvent] : ""}
                    ${isDefaultValue ? "" : "text-[#7091D5] font-bold"}
                    ${isWrongCellValue ? "bg-red-100 text-red-500" : ""}
                         
                         
                         flex justify-center items-center`}
      >
        {cellValue == 0 ? "" : cellValue}
      </div> */}
    </>
  );
}

export default memo(GameCell);
