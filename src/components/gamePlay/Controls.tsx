import { Button } from "@/components/ui/button";
import { Eraser } from "lucide-react";
import { RotateCcw } from "lucide-react";
// import { CircleFadingArrowUpIcon } from "lucide-react";
import { Pen } from "lucide-react";
// import { PenOff } from "lucide-react";
import { Lightbulb } from "lucide-react";
// export function ButtonIcon() {
//   return (
//     <Button variant="outline" size="icon">
//       <CircleFadingArrowUpIcon />
//     </Button>
//   );
// }

import { useGameStore } from "@/store/store";

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

  function handleRestBoard() {
    // console.log("rest clicked");
    const initialBoard = useGameStore.getState().initialBoard;
    const restGame = useGameStore.getState().startNewGame;
    restGame(initialBoard);
  }

  function handleEraseCell() {
    const selectedCellCoordinate = useGameStore.getState().selectedCell;
    const initialBoard = useGameStore.getState().initialBoard;
    const currentBoard = useGameStore.getState().gameBoard;
    const EraseCellValue = useGameStore.getState().setGameBoard;

    if (!selectedCellCoordinate) return;

    const [x, y] = selectedCellCoordinate;

    if (initialBoard[x][y] != 0) return; //default value so return

    if (currentBoard[x][y] == 0) return; //cell is empty

    const newGameBoard = currentBoard.map((e) => [...e]);
    newGameBoard[x][y] = 0;

    EraseCellValue(newGameBoard);
    console.log("erased");
  }

  return (
    <>
      {/* <Button onClick={handleClick} variant="outline">
        Button
      </Button> */}

      <div className="flex items-center justify-between  min-h-12     w-full">
        {/* //Reset game board */}
        <Button
          onClick={handleRestBoard}
          variant="outline"
          size="icon"
          className="h-11 w-11 md:h-14 md:w-14 text-[#7091D5] cursor-pointer"
        >
          <RotateCcw />
        </Button>
        {/* //Erase cell */}
        <Button
          onClick={handleEraseCell}
          variant="outline"
          size="icon"
          className="h-11 w-11 md:h-14 md:w-14 text-[#7091D5]"
        >
          <Eraser />
        </Button>

        {/* //Notes Mode*/}
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

        {/* //Hint random*/}
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
