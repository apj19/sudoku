import { useEffect } from "react";
import Cell from "./Cell";
import { useGameStore } from "@/store/store";

import { generateNewGame } from "@/helper/gameGenerator/generateNewGame";
import SEED from "@/helper/seed";
import generateShuffledBoard from "@/helper/gameGenerator/shuffleSeed";
import { Button } from "../ui/button";
import GameTypeSelector from "../ui/GameTypeSelector";
import { Play } from "lucide-react";
import { CirclePause } from "lucide-react";

export default function GameBoard() {
  const mainBoard = useGameStore((state) => state.gameBoard);
  const currentSelectedCell = useGameStore((state) => state.selectedCell);
  const highliteSameCells = useGameStore((state) => state.HighliteSameCell);
  const connectedCell = useGameStore((state) => state.connectCell);
  const initialGameValue = useGameStore((state) => state.initialBoard);

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

  const gameDifficulty = useGameStore((state) => state.difficulty);
  const setGameSolution = useGameStore((state) => state.setSolution);
  const wrongCell = useGameStore((state) => state.isWrongCellValue);
  const currentMistakeCount = useGameStore((state) => state.mistakeCount);
  const maxMistakeCount = useGameStore((state) => state.maxMistakeCount);
  const resetMistake = useGameStore((state) => state.resetMistakeCount);
  const startNewGame = useGameStore((state) => state.startNewGame);
  const gameID = useGameStore((state) => state.gameId);

  const updateGameBoardWithLog = useGameStore((state) => state.updateGameBoard);
  const startTimer = useGameStore((state) => state.startTimer);
  const changTimerState = useGameStore((state) => state.timerState);

  useEffect(() => {
    //this use effect start new game and set initial value and solution on game load
    //this is default gae
    // console.group("difficulty changes");
    const shuffledBoard = generateShuffledBoard(SEED);

    const newGame = generateNewGame(shuffledBoard, gameDifficulty);

    //replace with main game logic
    setGameSolution(shuffledBoard);
    setNewGameBoardInitialValue(newGame); //
    startNewGame(newGame);
    resetMistake();
  }, [gameDifficulty, gameID]);

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

        // updateGameBoardWithCoordinate(row, col, Number(e.key));
        updateGameBoardWithLog(row, col, Number(e.key));
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
      {currentMistakeCount == maxMistakeCount ? (
        <div className="fixed top-1/2 left-1/2 z-50 grid justify-center items-center  backdrop-blur-sm w-full h-full -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center justify-center gap-5 bg-popover p-5 rounded-lg">
            <p className="text-2xl font-bold">Game Over</p>
            <p>You have made 3 mistakes and lost the game</p>

            <GameTypeSelector />
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className=" grid grid-cols-9 grid-rows-9 aspect-square w-full max-w-125 border-2 border-foreground/50 relative  ">
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
              highlitedCells={highliteSameCells.has(`${idx}${cdx}`)}
              connectedCell={connectedCell.has(`${idx}${cdx}`)}
              currentTryingCell={
                tryingCell?.coordinate[0] == idx &&
                tryingCell?.coordinate[1] == cdx
              }
              currentTryingEvent={tryingCell?.event || "TRY"}
              isDefaultValue={initialGameValue[idx][cdx] != 0}
              isWrongCellValue={
                wrongCell?.[0] === idx && wrongCell?.[1] === cdx
              }
            />
          )),
        )}

        <div>
          {startTimer ? (
            <></>
          ) : (
            <div className="absolute top-1/2 left-1/2 z-50 grid justify-center items-center backdrop-blur-sm w-full h-full -translate-x-1/2 -translate-y-1/2">
              <Button
                onClick={() => changTimerState()}
                variant="outline"
                size="icon"
                className="h-7 w-7 md:h-9 md:w-9 text-[#7091D5] cursor-pointer bg-popover"
              >
                {startTimer ? <CirclePause /> : <Play />}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
