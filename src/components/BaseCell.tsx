import { memo } from "react";

interface BaseCellProps {
  cellValue: number;
  xCoordinate: number;
  yCoordinate: number;
  bgColor?: string;
  onClick?: () => void;
}

function BaseCell({
  cellValue,
  xCoordinate,
  yCoordinate,
  bgColor,
  onClick,
}: BaseCellProps) {
  return (
    <div
      onClick={onClick}
      className={` border border-gray-300 text-center cursor-pointer caret-transparent  
                     
                     ${yCoordinate === 2 || yCoordinate === 5 ? "border-r-2 border-r-foreground/50" : ""}
                     ${xCoordinate === 2 || xCoordinate === 5 ? "border-b-2 border-b-foreground/50" : ""}
                     ${bgColor}
                         
                         flex justify-center items-center`}
    >
      {cellValue == 0 ? "" : cellValue}
    </div>
  );
}

export default memo(BaseCell);
