import { useGameStore } from "@/store/store";
import Timer from "./Timer";

export default function GameState() {
  const mistakeCount = useGameStore((state) => state.mistakeCount);
  const maxMistakeCount = useGameStore((state) => state.maxMistakeCount);
  return (
    <div className=" flex items-center justify-between  min-h-10 md:min-h-12 text-base  ">
      <div className="flex flex-col items-center">
        <p>Mistakes</p>
        <p>
          {mistakeCount}/{maxMistakeCount}
        </p>
      </div>

      <div>
        <Timer />
      </div>
    </div>
  );
}
