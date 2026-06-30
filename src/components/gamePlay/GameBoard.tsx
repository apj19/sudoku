import { useEffect } from "react";
import Cell from "./Cell";
import { useGameStore } from "@/store/store";

export default function GameBoard() {
  const mainBoard = useGameStore((state) => state.gameBoard);
  const currentSelectedCell = useGameStore((state) => state.selectedCell);
  const highlitedCells = useGameStore((state) => state.HighliteSameCell);
  const connectedCell = useGameStore((state) => state.connectCell);
  const setUpdatedBoard = useGameStore((state) => state.setGameBoard);
  const setSelectedCell = useGameStore((state) => state.setSelectedCell);
  const updateHighliteCells = useGameStore(
    (state) => state.updateHighliteSameCell,
  );

  const isSolving = useGameStore((state) => state.isSolving);
  const SolverSpeed = useGameStore((state) => state.speed);
  const nextSolvingStep = useGameStore((state) => state.nextEvent);
  const tryingCell = useGameStore((state) => state.currentActiveCell);

  //this use effect handles windows keyboard events

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!currentSelectedCell) return;
      const [row, col] = currentSelectedCell;

      const mainBoard = useGameStore.getState().gameBoard;
      const updatedBoard: number[][] = mainBoard.map((rows) =>
        rows.map((e) => e),
      );

      //   console.log(e);

      if (e.key >= "1" && e.key <= "9") {
        // setCellValue(row, col, Number(e.key));
        //   console.log(currentSelectedCell);
        if (updatedBoard[row][col] == Number(e.key)) {
          updatedBoard[row][col] = 0;
          updateHighliteCells(0);
        } else {
          updatedBoard[row][col] = Number(e.key);
          updateHighliteCells(Number(e.key));
        }

        setUpdatedBoard(updatedBoard);
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

  useEffect(() => {
    // console.log("issloving use effect", isSolving);
    if (!isSolving) return;

    const interval = setInterval(() => {
      nextSolvingStep();
    }, SolverSpeed);

    return () => clearInterval(interval);
  }, [isSolving, SolverSpeed]);

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
                <Cell
                  cellValue={col}
                  xCoordinate={idx}
                  yCoordinate={cdx}
                  currentSelectedCell={
                    currentSelectedCell?.[0] == idx &&
                    currentSelectedCell?.[1] == cdx
                  }
                  highlitedCells={highlitedCells.has(`${idx}${cdx}`)}
                  connectedCell={connectedCell.has(`${idx}${cdx}`)}
                  currentTryingCell={
                    tryingCell?.coordinate[0] == idx &&
                    tryingCell?.coordinate[1] == cdx
                  }
                  currentTryingEvent={tryingCell?.event || "TRY"}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
