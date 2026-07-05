import { useGameStore } from "@/store/store";
import BoardCell from "./BoardCell";
import { useEffect } from "react";

export default function Board() {
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
      <div className=" grid grid-cols-9 grid-rows-9 aspect-square w-full max-w-125 border-2 border-foreground/50 relative  ">
        {mainBoard.map((row, idx) =>
          row.map((col, cdx) => (
            <BoardCell
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
      </div>
    </>
  );
}
