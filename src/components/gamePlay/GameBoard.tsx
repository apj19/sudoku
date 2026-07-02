import { useEffect } from "react";
import Cell from "./Cell";
import { useGameStore } from "@/store/store";

export default function GameBoard() {
  const mainBoard = useGameStore((state) => state.gameBoard);
  const currentSelectedCell = useGameStore((state) => state.selectedCell);
  const highlitedCells = useGameStore((state) => state.HighliteSameCell);
  const connectedCell = useGameStore((state) => state.connectCell);
  const initialGameValue = useGameStore((state) => state.initialBoard);

  // const setSelectedCell = useGameStore((state) => state.setSelectedCell);
  // const updateHighliteCells = useGameStore(
  //   (state) => state.updateHighliteSameCell,
  // );

  const isSolving = useGameStore((state) => state.isSolving);
  const SolverSpeed = useGameStore((state) => state.speed);
  const nextSolvingStep = useGameStore((state) => state.nextEvent);
  const tryingCell = useGameStore((state) => state.currentActiveCell);

  const updateGameBoardWithCoordinate = useGameStore(
    (state) => state.updateGameBoardWithCoordinate,
  );

  const setNewGameBoardInitialValue = useGameStore(
    (state) => state.setInitialBoard,
  );
  const setNewGameBoard = useGameStore((state) => state.setGameBoard);

  useEffect(() => {
    //this use effect start new game and set initial value and solution on game load
    //this is default gae
    const newGame: number[][] = [
      [0, 4, 2, 1, 5, 7, 0, 3, 8],
      [9, 3, 1, 2, 8, 6, 5, 7, 4],
      [7, 8, 5, 3, 9, 4, 1, 6, 2],
      [1, 6, 8, 5, 2, 3, 7, 4, 9],
      [3, 5, 4, 7, 0, 9, 8, 2, 6],
      [2, 7, 9, 6, 4, 8, 3, 1, 5],
      [8, 2, 3, 4, 7, 5, 6, 9, 1],
      [4, 9, 6, 8, 3, 1, 2, 5, 7],
      [5, 1, 7, 9, 6, 2, 4, 0, 0],
    ];

    //replace with main game logic
    setNewGameBoardInitialValue(newGame); //
    setNewGameBoard(newGame);
  }, []);

  //this use effect handles windows keyboard events

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!currentSelectedCell) return;
      const [row, col] = currentSelectedCell;

      if (initialGameValue[row][col] != 0) return;

      // const mainBoard = useGameStore.getState().gameBoard;
      // const updatedBoard: number[][] = mainBoard.map((rows) =>
      //   rows.map((e) => e),
      // );

      //   console.log(e);

      if (e.key >= "1" && e.key <= "9") {
        // setCellValue(row, col, Number(e.key));
        //   console.log(currentSelectedCell);
        // if (updatedBoard[row][col] == Number(e.key)) {
        //   // updatedBoard[row][col] = 0;
        //   updateHighliteCells(0);
        // } else {
        //   // updatedBoard[row][col] = Number(e.key);
        // updateHighliteCells(Number(e.key));

        updateGameBoardWithCoordinate(row, col, Number(e.key));
      }
      // else if (e.key.startsWith("Arrow")) {
      //   e.preventDefault();
      //   // console.log(e.key);
      //   if (e.key === "ArrowUp") setSelectedCell(row - 1, col);
      //   if (e.key === "ArrowDown") setSelectedCell(row + 1, col);
      //   if (e.key === "ArrowLeft") setSelectedCell(row, col - 1);
      //   if (e.key === "ArrowRight") setSelectedCell(row, col + 1);
      // }
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
    //  className="  [&>*:nth-child(1)]:border-t-2  [&>*:nth-child(3n)]:border-b-2"
    // className="flex [&>*:nth-child(3n)]:border-r-2   [&>*:nth-child(1)]:border-l-2
    //grid grid-rows-9 gap-0
    //grid grid-cols-9 gap-0
    <>
      <div className=" grid grid-cols-9 grid-rows-9 aspect-square w-full max-w-125 border-2 border-foreground/50  ">
        {mainBoard.map((row, idx) =>
          row.map((col, cdx) => (
            <Cell
              key={`${idx}-${cdx}`}
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
              isDefaultValue={initialGameValue[idx][cdx] != 0}
            />
          )),
        )}
      </div>
    </>
  );
}
