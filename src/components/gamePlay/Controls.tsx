import { Button } from "@/components/ui/button";
import { Eraser } from "lucide-react";
import { RotateCcw } from "lucide-react";
import { CircleFadingArrowUpIcon } from "lucide-react";
import { Pen } from "lucide-react";
import { PenOff } from "lucide-react";
import { Lightbulb } from "lucide-react";
export function ButtonIcon() {
  return (
    <Button variant="outline" size="icon">
      <CircleFadingArrowUpIcon />
    </Button>
  );
}

export default function Controls() {
  // const isSolving = useGameStore((state) => state.isSolving);
  // const solve = useGameStore((state) => state.setIsSolving);
  // const solveBoard = useGameStore((state) => state.setEventLog);
  // const updateHighliteCells = useGameStore(
  //   (state) => state.updateHighliteSameCell,
  // );

  // function handleClick() {
  //   updateHighliteCells(0);
  //   console.log("solving clicked");
  //   // solveBoard();

  //   solveBoard();

  //   solve();
  // }

  return (
    <>
      {/* <Button onClick={handleClick} variant="outline">
        Button
      </Button> */}

      <div className="flex items-center justify-between  min-h-12     w-full">
        <Button
          variant="outline"
          size="icon"
          className="h-11 w-11 md:h-14 md:w-14 text-[#7091D5]"
        >
          <RotateCcw />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-11 w-11 md:h-14 md:w-14 text-[#7091D5]"
        >
          <Eraser />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-11 w-11 md:h-14 md:w-14 text-[#7091D5]"
        >
          <Pen />
        </Button>
        {/* <Button variant="outline" size="lg">
          <PenOff />
        </Button> */}
        <Button
          variant="outline"
          size="icon"
          className="h-11 w-11 md:h-14 md:w-14 text-[#7091D5]"
        >
          <Lightbulb />
        </Button>
      </div>
    </>
  );
}
