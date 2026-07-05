import { useGameStore } from "@/store/store";
import { Button } from "../ui/button";

export default function SolverControls() {
  const startSolver = useGameStore((state) => state.setIsSolving);
  const TotalSteps = useGameStore.getState().eventLog.length;
  function handleStartSolver() {
    startSolver();
  }
  return (
    <>
      <Button onClick={handleStartSolver}>Start</Button>
      <>{TotalSteps}</>
    </>
  );
}
