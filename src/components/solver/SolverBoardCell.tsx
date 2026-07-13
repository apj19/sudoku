import { memo } from "react";
import BaseCell from "../BaseCell";

interface BoardCellProps {
  cellValue: number;
  xCoordinate: number;
  yCoordinate: number;
  currentTryingCell: boolean;
  currentTryingEvent: "TRY" | "PLACE" | "BACKTRACK";
  isDefaultValue: boolean;
}

function SolverBoardCell({
  cellValue,
  xCoordinate,
  yCoordinate,
  currentTryingCell,
  currentTryingEvent,
  isDefaultValue,
}: BoardCellProps) {
  const solvingStyle = {
    TRY: "bg-yellow-200",
    PLACE: "bg-green-200",
    BACKTRACK: "bg-red-200",
  };

  function generateBackgrodCssFromProps(): string {
    let res: string = "";

    if (!isDefaultValue) {
      res = res + " " + "text-[#7091D5] font-bold";
    }

    if (currentTryingCell) {
      res = res + " " + solvingStyle[currentTryingEvent];
    }

    return res;
  }

  return (
    <>
      <BaseCell
        cellValue={cellValue}
        xCoordinate={xCoordinate}
        yCoordinate={yCoordinate}
        bgColor={generateBackgrodCssFromProps()}
      ></BaseCell>
      {/* <div
        className={` border border-gray-300 text-center cursor-pointer caret-transparent  
                 ${yCoordinate === 2 || yCoordinate === 5 ? "border-r-2 border-r-foreground/50" : ""}
                ${xCoordinate === 2 || xCoordinate === 5 ? "border-b-2 border-b-foreground/50" : ""}
                ${currentTryingCell ? solvingStyle[currentTryingEvent] : ""}
                    flex justify-center items-center`}
      >
        {cellValue == 0 ? "" : cellValue}
      </div> */}
    </>
  );
}

export default memo(SolverBoardCell);
