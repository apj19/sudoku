import { useGameStore } from "@/store/store";
import { useEffect } from "react";
import { Play } from "lucide-react";
import { CirclePause } from "lucide-react";
import { Button } from "../ui/button";

export default function Timer() {
  const time = useGameStore((state) => state.timeInSec);
  const startTimer = useGameStore((state) => state.startTimer);
  const timerIncrement = useGameStore((state) => state.incrementTime);
  const chnagTimerState = useGameStore((state) => state.timerState);

  function formatTime(timer: number) {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  useEffect(() => {
    if (!startTimer) return;

    const interval = setInterval(() => {
      timerIncrement();
    }, 1000);

    return () => clearInterval(interval);
  }, [startTimer]);

  return (
    <>
      <div className=" flex gap-4 text-foreground text-base justify-center items-center px-2 ">
        <div className="flex flex-col justify-center items-center">
          <p>Time</p>
          <p>{formatTime(time)}</p>
        </div>
        <Button
          onClick={() => chnagTimerState()}
          variant="outline"
          size="icon"
          className="h-7 w-7 md:h-9 md:w-9 text-[#7091D5] cursor-pointer"
        >
          {startTimer ? <CirclePause /> : <Play />}
        </Button>
      </div>
    </>
  );
}
