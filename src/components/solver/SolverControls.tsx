import { Button } from "../ui/button";

import { useSolverStore } from "@/store/solverStore";

export default function SolverControls() {
  const startSolver = useSolverStore((state) => state.setIsSolving);

  function handleStartSolver() {
    startSolver();
  }
  return (
    <>
      <div className="flex justify-between items-center">
        <Button>Prev</Button>
        <Button onClick={handleStartSolver}>Start</Button>
        <Button>Next</Button>
        <Button>Speed</Button>
      </div>
    </>
  );
}
