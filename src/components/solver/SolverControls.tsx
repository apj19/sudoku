import { useGameStore } from "@/store/store";
import { Button } from "../ui/button";
import GameTypeSelector from "../ui/GameTypeSelector";

export default function SolverControls() {
  const startSolver = useGameStore((state) => state.setIsSolving);
  const TotalSteps = useGameStore.getState().eventLog.length;
  function handleStartSolver() {
    startSolver();
  }
  return (
    <>
      <div>
        <Button onClick={handleStartSolver}>Start</Button>
        <p>{TotalSteps}</p>
        <GameTypeSelector />
      </div>
    </>
  );
}
