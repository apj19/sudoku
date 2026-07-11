import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import GameTypeSelector from "../ui/GameTypeSelector";
import { useGameStore } from "@/store/store";
import { useSolverStore } from "@/store/solverStore";
import GameTypeSelect from "../GameTypeSelect";

// export function ButtonSecondary() {
//   return <Button variant="secondary">Secondary</Button>
// }

export default function GameType() {
  const navigate = useNavigate();
  const gameDifficulty = useGameStore((state) => state.difficulty);

  const copyToSolverBoard = useSolverStore((state) => state.setSolverBoard);

  const setGameDifficulty = useGameStore((state) => state.setDifficulty);
  const setGameId = useGameStore((state) => state.incrementGameId);

  function handleGoToSolver() {
    const gameBoard = useGameStore.getState().gameBoard;
    const deepCopy = gameBoard.map((e) => [...e]);

    const SolverBoard = useSolverStore.getState().solverBoard;

    if (SolverBoard.length == 0) {
      copyToSolverBoard(deepCopy);
    }

    navigate("/solver");
  }
  return (
    <div className="flex  justify-between items-center min-h-8 md:min-h-12    ">
      {/* <Button size={"lg"} variant="secondary">
        New Game
      </Button> */}

      {/* <GameTypeSelector /> */}
      <GameTypeSelect setDiffictly={setGameDifficulty} setGameId={setGameId} />

      <p className="text-[#7091D5]">{gameDifficulty.toUpperCase()}</p>

      {/* <Link to="/solver" state={{ fromHome: true }}> */}
      <Button onClick={handleGoToSolver} size={"lg"} variant="secondary">
        Solver
      </Button>
    </div>
  );
}
