import { Button } from "@/components/ui/button";
import { Eraser, PenOff } from "lucide-react";
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
  const noteMode = useGameStore((state) => state.noteMode);

  function handleRestBoard() {
    // console.log("rest clicked");
    const initialBoard = useGameStore.getState().initialBoard;
    const restGame = useGameStore.getState().startNewGame;
    restGame(initialBoard);
  }

  function handleUndoAction() {
    console.log("undo clicked");

    const undoAction = useGameStore.getState().undoAction;

    undoAction();
  }

  function toggleNoteMode() {
    const toggleNoteMode = useGameStore.getState().toogleNoteMode;
    toggleNoteMode();
  }

  function handleEraseCell() {
    // const selectedCellCoordinate = useGameStore.getState().selectedCell;
    // const initialBoard = useGameStore.getState().initialBoard;
    // const currentBoard = useGameStore.getState().gameBoard;
    // const EraseCellValue = useGameStore.getState().setGameBoard;

    // if (!selectedCellCoordinate) return;

    // const [x, y] = selectedCellCoordinate;

    // if (initialBoard[x][y] != 0) return; //default value so return

    // if (currentBoard[x][y] == 0) return; //cell is empty

    // const newGameBoard = currentBoard.map((e) => [...e]);
    // newGameBoard[x][y] = 0;

    // EraseCellValue(newGameBoard);

    const eraseAction = useGameStore.getState().EraseAction;

    eraseAction();
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
          disabled={noteMode}
          onClick={handleUndoAction}
          variant="outline"
          size="icon"
          className="h-11 w-11 md:h-14 md:w-14 text-[#7091D5] cursor-pointer"
        >
          <RotateCcw />
        </Button>

        {/* <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="outline"
                size="icon"
                className="h-11 w-11 md:h-14 md:w-14 text-[#7091D5]"
              >
                <Lightbulb />
              </Button>
            }
          />
          <TooltipContent side="top" align="end" sideOffset={6}>
            <p>Fill Random or Current Selected Cell </p>
          </TooltipContent>
        </Tooltip> */}
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
          onClick={toggleNoteMode}
          variant="outline"
          size="icon"
          className="h-11 w-11 md:h-14 md:w-14 text-[#7091D5]"
        >
          {noteMode ? <PenOff /> : <Pen />}
        </Button>

        {/* {noteMode ?  <Button  
          variant="outline"
          size="icon"
          className="h-11 w-11 md:h-14 md:w-14 text-[#7091D5]"
        >
          <Pen />

        </Button>:<Button variant="outline" size="lg">
          <PenOff />
        </Button>} */}

        {/* <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="outline"
                size="icon"
                className="h-11 w-11 md:h-14 md:w-14 text-[#7091D5]"
              >
                <Lightbulb />
              </Button>
            }
          />
          <TooltipContent side="top" align="end" sideOffset={6}>
            <p>Fill Random or Current Selected Cell </p>
          </TooltipContent>
        </Tooltip> */}
        {/* <Button variant="outline" size="lg">
          <PenOff />
        </Button> */}

        {/* //Hint random*/}
        <Button
          disabled={noteMode}
          variant="outline"
          size="icon"
          className="h-11 w-11 md:h-14 md:w-14 text-[#7091D5]"
        >
          <Lightbulb />
        </Button>

        {/* <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="outline"
                size="icon"
                className="h-11 w-11 md:h-14 md:w-14 text-[#7091D5]"
              >
                <Lightbulb />
              </Button>
            }
          />
          <TooltipContent side="top" align="end" sideOffset={6}>
            <p>Fill Random or Current Selected Cell </p>
          </TooltipContent>
        </Tooltip> */}
      </div>
    </>
  );
}
