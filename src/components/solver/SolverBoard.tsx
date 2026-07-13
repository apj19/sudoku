import { useEffect, useRef } from "react";
import BoardShell from "../BoardShell";
import SolverBoardCell from "./SolverBoardCell";
import { useSolverStore } from "@/store/solverStore";
import generateShuffledBoard from "@/helper/gameGenerator/shuffleSeed";
import { generateNewGame } from "@/helper/gameGenerator/generateNewGame";
import SEED from "@/helper/seed";

export default function SolverBoard() {
  const mainBoard = useSolverStore((state) => state.solverBoard);
  const isSolving = useSolverStore((state) => state.isSolving);
  const SolverSpeed = useSolverStore((state) => state.speed);
  const nextSolvingStep = useSolverStore((state) => state.nextEvent);
  const tryingCell = useSolverStore((state) => state.currentActiveCell);

  const solverDifficulty = useSolverStore(
    (state) => state.solverGameDifficulty,
  );
  const solverGameId = useSolverStore((state) => state.solverGameId);

  const prevGameIDRef = useRef(solverGameId);

  const startNewBoardSolver = useSolverStore((state) => state.startNewGame);

  const initialBoardValue = useSolverStore((state) => state.intialBoard);

  useEffect(() => {
    //this use effect start new game and set initial value and solution on game load
    //this is default gae
    // console.group("difficulty changes");
    // console.group(gameID);
    const hasGameIDChanged = solverGameId !== prevGameIDRef.current;
    prevGameIDRef.current = solverGameId; // update ref for next time

    // if (mainBoard.length != 0) {
    //   return;
    // }

    if (hasGameIDChanged || mainBoard.length === 0) {
      const shuffledBoard = generateShuffledBoard(SEED);
      const newGame = generateNewGame(shuffledBoard, solverDifficulty);

      startNewBoardSolver(newGame);
    }
  }, [solverDifficulty, solverGameId]);

  useEffect(() => {
    // console.log("issloving use effect", isSolving);

    if (!isSolving) return;

    const interval = setInterval(() => {
      nextSolvingStep(1);
    }, SolverSpeed);

    return () => clearInterval(interval);
  }, [isSolving, SolverSpeed]);

  return (
    <>
      <BoardShell>
        {mainBoard.map((row, idx) =>
          row.map((col, cdx) => (
            <SolverBoardCell
              cellValue={col}
              xCoordinate={idx}
              yCoordinate={cdx}
              key={`${idx}-${cdx}`}
              currentTryingCell={
                tryingCell?.coordinate[0] == idx &&
                tryingCell?.coordinate[1] == cdx
              }
              isDefaultValue={initialBoardValue[idx][cdx] != 0}
              currentTryingEvent={tryingCell?.event || "TRY"}
            />
          )),
        )}
      </BoardShell>
    </>
  );
}
