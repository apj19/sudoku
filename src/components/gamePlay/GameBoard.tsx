import { useEffect, useState } from "react";
import Cell from "./Cell";
import { useGameStore } from "@/store/store";
import { sameCells } from "@/helper/validationCheck";

export default function GameBoard() {
  const mainBoard = useGameStore((state) => state.gameBoard);
  const currentSelectedCell = useGameStore((state) => state.selectedCell);

  const setUpdatedBoard = useGameStore((state) => state.setGameBoard);
  const setSelectedCell = useGameStore((state) => state.setSelectedCell);
  const updateHighliteCells = useGameStore(
    (state) => state.updateHighliteSameCell,
  );

  useEffect(() => {
    // console.log("use effect triggred");
    // const selectedCellCoordinate = useGameStore((state) => state.selectedCell);
    const onKeyDown = (e: KeyboardEvent) => {
      // const currentSelectedCell = useGameStore.getState().selectedCell;

      if (currentSelectedCell[0] == 10) return;

      const mainBoard = useGameStore.getState().gameBoard;
      const updatedBoard: number[][] = mainBoard.map((rows) =>
        rows.map((e) => e),
      );

      const [row, col] = currentSelectedCell;
      //   console.log(e);

      if (e.key >= "1" && e.key <= "9") {
        // setCellValue(row, col, Number(e.key));
        //   console.log(currentSelectedCell);
        updatedBoard[row][col] = Number(e.key);

        setUpdatedBoard(updatedBoard);
        updateHighliteCells(new Set(sameCells(updatedBoard, Number(e.key))));
      } else if (e.key.startsWith("Arrow")) {
        e.preventDefault();
        // console.log(e.key);
        if (e.key === "ArrowUp") setSelectedCell(row - 1, col);
        if (e.key === "ArrowDown") setSelectedCell(row + 1, col);
        if (e.key === "ArrowLeft") setSelectedCell(row, col - 1);
        if (e.key === "ArrowRight") setSelectedCell(row, col + 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentSelectedCell]);

  // function handleChange(
  //   row: number,
  //   col: number,
  //   event: React.ChangeEvent<HTMLInputElement>,
  // ) {
  //   console.log("changeEvent triggred");
  //   let newArray: number[][] = mainBoard.map((rows) => rows.map((e) => e));

  //   let currentInputValue: string = event.currentTarget.value.replace(
  //     /[^0-9]/g,
  //     "",
  //   );
  //   if (currentInputValue.length > 1) {
  //     currentInputValue = currentInputValue.slice(-1);
  //   }

  //   newArray[row][col] = Number(currentInputValue);

  //   // const newSet = new Set<string>();
  //   // if (newarray[row][col] != solution.current[row][col]) {
  //   //   newSet.add(`${row}${col}`);
  //   // }
  //   // setCheckCellValuel(newSet);
  //   // setSameCellValue(new Set(sameCells(mainBoard, Number(currentinputValue))));

  //   setMainBoard(newArray);
  // }

  return (
    <>
      <div className="  [&>*:nth-child(1)]:border-t-2  [&>*:nth-child(3n)]:border-b-2 text-black">
        {mainBoard.map((row, idx) => (
          <div
            key={idx}
            className="flex [&>*:nth-child(3n)]:border-r-2   [&>*:nth-child(1)]:border-l-2
      
      "
          >
            {" "}
            {row.map((col, cdx) => (
              <div key={cdx}>
                {" "}
                {/* <input
                  className={`h-7 w-7 md:w-12 md:h-12   border border-gray-300 text-center cursor-pointer caret-transparent  
                     focus:bg-blue-200 
                     }

                     `}
                  type="text"
                  value={col == 0 ? "" : col}
                  onChange={(event) => handleChange(idx, cdx, event)}
                  // onClick={() => hanleClick(idx, cdx)}
                />{" "} */}
                <Cell cellValue={col} xCoordinate={idx} yCoordinate={cdx} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

// ${
//                        checkCellValue.has(`${idx}${cdx}`)
//                          ? "text-red-500"
//                          : "text-black"
//                      }
//                      ${focusedCell.has(`${idx}${cdx}`) ? "bg-blue-100" : ""}
//                      ${sameCellValue.has(`${idx}${cdx}`) ? "bg-blue-300" : ""}
//                      ${
//                        tryValue?.coordinate == `${idx}${cdx}`
//                          ? solvingStyle[tryValue.event]
//                          : ""
