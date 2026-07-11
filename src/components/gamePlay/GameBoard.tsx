import { useEffect, useRef } from "react";
import { useGameStore } from "@/store/store";
import { generateNewGame } from "@/helper/gameGenerator/generateNewGame";
import SEED from "@/helper/seed";
import generateShuffledBoard from "@/helper/gameGenerator/shuffleSeed";
import { Button } from "../ui/button";
import GameTypeSelector from "../ui/GameTypeSelector";
import { Play } from "lucide-react";
import { CirclePause } from "lucide-react";
import BoardShell from "../BoardShell";
import GameCell from "./GameCell";
import Confetti from "react-confetti";
import GameWon from "../GameWon";

export default function GameBoard() {
  const mainBoard = useGameStore((state) => state.gameBoard);
  const currentSelectedCell = useGameStore((state) => state.selectedCell);
  const highliteSameCells = useGameStore((state) => state.HighliteSameCell);
  const connectedCell = useGameStore((state) => state.connectCell);
  const initialGameValue = useGameStore((state) => state.initialBoard);
  const setNewGameBoardInitialValue = useGameStore(
    (state) => state.setInitialBoard,
  );

  const gameDifficulty = useGameStore((state) => state.difficulty);
  const setGameSolution = useGameStore((state) => state.setSolution);
  const wrongCell = useGameStore((state) => state.isWrongCellValue);
  const currentMistakeCount = useGameStore((state) => state.mistakeCount);
  const maxMistakeCount = useGameStore((state) => state.maxMistakeCount);
  const resetMistake = useGameStore((state) => state.resetMistakeCount);
  const startNewGame = useGameStore((state) => state.startNewGame);
  const gameID = useGameStore((state) => state.gameId);

  const prevGameIDRef = useRef(gameID);

  const updateGameBoardWithLog = useGameStore((state) => state.updateGameBoard);
  const startTimer = useGameStore((state) => state.startTimer);
  const changTimerState = useGameStore((state) => state.timerState);

  // const noteMode = useGameStore((state) => state.noteMode);
  const notes = useGameStore((state) => state.notes);
  const errorCordinates = useGameStore((state) => state.errorCordinates);

  const gamwWoneFlag = useGameStore((state) => state.gameWon);

  useEffect(() => {
    //this use effect start new game and set initial value and solution on game load
    //this is default gae
    // console.group("difficulty changes");
    // console.group(gameID);
    const hasGameIDChanged = gameID !== prevGameIDRef.current;
    prevGameIDRef.current = gameID; // update ref for next time

    // if (mainBoard.length != 0) {
    //   return;
    // }

    if (hasGameIDChanged || mainBoard.length === 0) {
      const shuffledBoard = generateShuffledBoard(SEED);

      const newGame = generateNewGame(shuffledBoard, gameDifficulty);
      // console.log(newGame);

      //replace with main game logic
      setGameSolution(shuffledBoard);
      setNewGameBoardInitialValue(newGame); //
      startNewGame(newGame);
      resetMistake();
    }
    // } else if (mainBoard.length === 0) {
    //   const shuffledBoard = generateShuffledBoard(SEED);

    //   const newGame = generateNewGame(shuffledBoard, gameDifficulty);

    //   //replace with main game logic
    //   setGameSolution(shuffledBoard);
    //   setNewGameBoardInitialValue(newGame); //
    //   startNewGame(newGame);
    //   resetMistake();
    // }

    //moving here back from solver
  }, [gameDifficulty, gameID]);

  //this use effect handles windows keyboard events

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!currentSelectedCell) return;
      const [row, col] = currentSelectedCell;

      if (initialGameValue[row][col] != 0) return;

      if (e.key >= "1" && e.key <= "9") {
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

  return (
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

      <BoardShell>
        {mainBoard.map((row, idx) =>
          row.map((col, cdx) => (
            <GameCell
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
              isDefaultValue={initialGameValue[idx][cdx] != 0}
              isWrongCellValue={
                wrongCell?.[0] === idx && wrongCell?.[1] === cdx
              }
              notes={notes[`${idx}-${cdx}`]}
              isErrorCell={errorCordinates.has(`${idx}-${cdx}`)}
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
      </BoardShell>

      {/* <Confetti
        className="w-full h-full z-1000"
        numberOfPieces={200} // Adjust density (default is 200)
        recycle={true} // Set to true to run INFINITELY (default is true)
      /> */}

      {gamwWoneFlag ? <GameWon /> : <></>}
    </>
  );
}
