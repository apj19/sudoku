import { useGameStore } from "@/store/store";



export default function GameState() {
  const mistakeCount = useGameStore((state) => state.mistakeCount);
  const maxMistakeCount = useGameStore((state) => state.maxMistakeCount);
return (
    <div className=" flex items-center justify-between  min-h-10 md:min-h-12  ">
      <div className="flex flex-col items-center">
        <p>Mistakes</p>
        <p>
          {mistakeCount}/{maxMistakeCount}
        </p>
      </div>
      

      <div>
        <p>Timer</p>
      </div>
    </div>
  );
}
