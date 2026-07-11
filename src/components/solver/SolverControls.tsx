import { Button } from "../ui/button";

import { useSolverStore } from "@/store/solverStore";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import SpeedSelector from "./SpeedSelector";
export default function SolverControls() {
  const startSolver = useSolverStore((state) => state.setIsSolving);
  const isSolving = useSolverStore((state) => state.isSolving);
  const nextStpe = useSolverStore((state) => state.nextEvent);

  function handleStartSolver() {
    startSolver();
  }

  function handleNextStep() {
    nextStpe(1);
  }

  function hanlePrvStep() {
    nextStpe(-1);
  }
  return (
    <>
      <div className="flex justify-between items-center">
        <Button
          disabled={isSolving}
          onClick={hanlePrvStep}
          variant="outline"
          size="icon"
          className="h-11 w-11 md:h-14 md:w-14 text-blue-500"
        >
          <ArrowLeft />
        </Button>

        {/* <Button onClick={handleStartSolver}>Start</Button> */}
        {/*  */}

        <Button
          onClick={handleStartSolver}
          variant="outline"
          size="icon"
          className="h-11 w-11 md:h-14 md:w-14 text-blue-500"
        >
          {isSolving ? <Pause /> : <Play />}
        </Button>

        <Button
          disabled={isSolving}
          onClick={handleNextStep}
          variant="outline"
          size="icon"
          className="h-11 w-11 md:h-14 md:w-14 text-blue-500"
        >
          <ArrowRight />
        </Button>

        <div className="h-11 w-11 md:h-14 md:w-14 text-blue-500">
          <SpeedSelector />
        </div>
      </div>
    </>
  );
}
