import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import GameTypeSelector from "../ui/GameTypeSelector";
import { useGameStore } from "@/store/store";

// export function ButtonSecondary() {
//   return <Button variant="secondary">Secondary</Button>
// }

export default function GameType() {
  const gameDifficulty = useGameStore((state) => state.difficulty);

  // function handleGoToSolver(){
    
  // }
  return (
    <div className="flex  justify-between items-center min-h-8 md:min-h-12    ">
      {/* <Button size={"lg"} variant="secondary">
        New Game
      </Button> */}

      <GameTypeSelector />

      <p className="text-[#7091D5]">{gameDifficulty.toUpperCase()}</p>

      <Link to="/solver" state={{ fromHome: true }}>
        <Button size={"lg"} variant="secondary">
          Solver
        </Button>
      </Link>
    </div>
  );
}
