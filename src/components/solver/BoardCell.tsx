interface BoardCellProps {
  cellValue: number;
  xCoordinate: number;
  yCoordinate: number;
currentTryingCell: boolean;
  currentTryingEvent: "TRY" | "PLACE" | "BACKTRACK";
}

export default function BoardCell({
  cellValue,
  xCoordinate,
  yCoordinate,
  currentTryingCell,
  currentTryingEvent
}: BoardCellProps) {

     const solvingStyle = {
    TRY: "bg-yellow-200",
    PLACE: "bg-green-200",
    BACKTRACK: "bg-red-200",
  };
  return (
    <>
      <div
        className={` border border-gray-300 text-center cursor-pointer caret-transparent  
                 ${yCoordinate === 2 || yCoordinate === 5 ? "border-r-2 border-r-foreground/50" : ""}
                ${xCoordinate === 2 || xCoordinate === 5 ? "border-b-2 border-b-foreground/50" : ""}
                ${currentTryingCell ? solvingStyle[currentTryingEvent] : ""}
                    flex justify-center items-center`}
      >
        {cellValue == 0 ? "" : cellValue}
      </div>
    </>
  );
}
