import { useEffect } from "react";
import BoardShell from "../BoardShell";
import SolverBoardCell from "./SolverBoardCell";
import { useSolverStore } from "@/store/solverStore";

export default function SolverBoard() {
  const mainBoard = useSolverStore((state) => state.solverBoard);
  const isSolving = useSolverStore((state) => state.isSolving);
  const SolverSpeed = useSolverStore((state) => state.speed);
  const nextSolvingStep = useSolverStore((state) => state.nextEvent);
  const tryingCell = useSolverStore((state) => state.currentActiveCell);

  //   useEffect(()=>{

  //   },[])
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
              currentTryingEvent={tryingCell?.event || "TRY"}
            />
          )),
        )}
      </BoardShell>
    </>
  );
}
