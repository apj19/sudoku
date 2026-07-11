import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import GameTypeSelect from "../GameTypeSelect";
import { useNavigate } from "react-router-dom";
import { useSolverStore } from "@/store/solverStore";

export default function SolverGame() {
  const navigate = useNavigate();
  const solverDifficulty = useSolverStore(
    (state) => state.setSolverGameDifficulty,
  );
  const solverGameId = useSolverStore((state) => state.incrementSolverGameId);

  function backToGame() {
    navigate("/");
  }

  return (
    <section className="flex justify-between items-center">
      {/* <button className="group relative rounded-lg border-2 border-sky-500 bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:shadow-lg">
        <span className="absolute top-0 left-0 size-full rounded-md border border-dashed border-sky-50 shadow-inner shadow-white/30 group-active:shadow-white/10" />
        <span className="absolute top-0 left-0 size-full rotate-180 rounded-md border-sky-50 shadow-inner shadow-black/30 group-active:shadow-black/10" />
        Try Different Board
      </button> */}

      <Button variant="outline" className="group" onClick={backToGame}>
        <ArrowLeftIcon className="transition-transform duration-200 group-hover:-translate-x-0.5" />
        Back to Game
      </Button>

      {/* <button className="group relative rounded-lg border-2 border-sky-500 bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:shadow-lg">
        <span className="absolute top-0 left-0 size-full rounded-md border border-dashed border-sky-50 shadow-inner shadow-white/30 group-active:shadow-white/10" />
        <span className="absolute top-0 left-0 size-full rotate-180 rounded-md border-sky-50 shadow-inner shadow-black/30 group-active:shadow-black/10" />
        Back to Game
      </button> */}

      <GameTypeSelect
        setDiffictly={solverDifficulty}
        setGameId={solverGameId}
      />

      {/* <Button variant="ghost" className="group">
        <ArrowLeftIcon className="transition-transform duration-200 group-hover:-translate-x-0.5" />
        Go to settings
      </Button> */}
    </section>
  );
}
