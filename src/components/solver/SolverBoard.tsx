import { useGameStore } from "@/store/store";

import { useEffect } from "react";
import BoardShell from "../BoardShell";
import SolverBoardCell from "./SolverBoardCell";

export default function SolverBoard() {
  const mainBoard = useGameStore((state) => state.gameBoard);
  const isSolving = useGameStore((state) => state.isSolving);
  const SolverSpeed = useGameStore((state) => state.speed);
  const nextSolvingStep = useGameStore((state) => state.nextEvent);
  const tryingCell = useGameStore((state) => state.currentActiveCell);

  //   useEffect(()=>{

  //   },[])
  useEffect(() => {
    // console.log("issloving use effect", isSolving);

    if (!isSolving) return;

    const interval = setInterval(() => {
      nextSolvingStep();
    }, 10);

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
      {/* <div className=" grid grid-cols-9 grid-rows-9 aspect-square w-full max-w-125 border-2 border-foreground/50 relative  ">
        
      </div> */}
    </>
  );
}
