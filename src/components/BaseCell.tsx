import { memo } from "react";

interface BaseCellProps {
  cellValue: number;
  xCoordinate: number;
  yCoordinate: number;
  bgColor?: string;
  onClick?: () => void;
  notes?: number[];
}

function BaseCell({
  cellValue,
  xCoordinate,
  yCoordinate,
  bgColor,
  onClick,
  notes,
}: BaseCellProps) {
  // console.log(xCoordinate, yCoordinate);
  return (
    <div
      onClick={onClick}
      className={` border border-foreground/50 text-center cursor-pointer caret-transparent 
                     
                     ${yCoordinate === 2 || yCoordinate === 5 ? "border-r-3 border-r-foreground/50" : ""}
                     ${xCoordinate === 2 || xCoordinate === 5 ? "border-b-3 border-b-foreground/50" : ""}
                     ${bgColor}
                         
                         flex justify-center items-center`}
    >
      {/* {noteMode && cellValue == 0 ? (
        <div className="grid grid-cols-3 grid-rows-3 w-full h-full">
          {""}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((e) => (
            <div
              key={e}
              className="flex items-center justify-center h-full w-full text-xs"
            >
              {notes?.includes(e) ? e : ""}
            </div>
          ))}
        </div>
      ) : cellValue == 0 ? (
        ""
      ) : (
        cellValue
      )} */}

      {cellValue == 0 ? (
        <div className="grid grid-cols-3 grid-rows-3 w-full h-full">
          {""}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((e) => (
            <div
              key={e}
              className="flex items-center justify-center h-full w-full text-xs"
            >
              {notes?.includes(e) ? e : ""}
            </div>
          ))}
        </div>
      ) : (
        cellValue
      )}
    </div>
  );
}

export default memo(BaseCell);
