import { Button } from "@/components/ui/button";
import { useGameStore } from "@/store/store";

export default function NumberPad() {
  const updateGameBoardWithCoordinate = useGameStore(
    (state) => state.updateGameBoardWithCoordinate,
  );
  const currentSelectedCell = useGameStore((state) => state.selectedCell);
  const initialGameValue = useGameStore((state) => state.initialBoard);
  const updateGameBoardWithLog = useGameStore((state) => state.updateGameBoard);

  function handleNumPadClick(num: number) {
    if (!currentSelectedCell) return;

    const [x, y] = currentSelectedCell;

    //checking for default value
    if (initialGameValue[x][y] != 0) return;

    // updateHighliteCells(num);
    // updateGameBoardWithCoordinate(x, y, num);
    updateGameBoardWithLog(x, y, num);

    // console.group(num);
  }
  return (
    <div className="flex items-center justify-between  min-h-12   text-[#7091D5]  w-full md:h-full md:gap-2 md:grid md:grid-cols-3 md:grid-rows-3 ">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((e) => (
        <Button
          key={e}
          onClick={() => handleNumPadClick(e)}
          variant="outline"
          className="h-10 md:h-full md:w-full md:text-3xl"
        >
          {e}
        </Button>
      ))}
    </div>
  );
}
