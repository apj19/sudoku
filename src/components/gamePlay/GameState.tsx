import { useGameStore } from "@/store/store";
import Timer from "./Timer";

export default function GameState() {
  const mistakeCount = useGameStore((state) => state.mistakeCount);
  const maxMistakeCount = useGameStore((state) => state.maxMistakeCount);
  return (
    <div className=" flex items-center justify-between  min-h-10 md:min-h-12 text-base  ">
      <div className="flex flex-col items-center">
        <p>Mistakes</p>
        <div>
          {/* <p></p>/{maxMistakeCount} */}
          <span className="text-red-500">{mistakeCount}</span> /{" "}
          <span>{maxMistakeCount} </span>
        </div>
      </div>

      <div>
        <Timer />
      </div>
    </div>
  );
}
