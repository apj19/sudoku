import { Button } from "@/components/ui/button";
import { Eraser, PenOff } from "lucide-react";
import { RotateCcw } from "lucide-react";
// import { CircleFadingArrowUpIcon } from "lucide-react";
import { Pen } from "lucide-react";
// import { PenOff } from "lucide-react";
import { Lightbulb } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  const maxHint = useGameStore((state) => state.maxHintCount);
  const currenthintCount = useGameStore((state) => state.hintCount);

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

  function handleHintAction() {
    const hintAction = useGameStore.getState().hintAction;
    hintAction();
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
          className="h-11 w-11 md:h-14 md:w-14 text-[#7091D5] relative"
        >
          {noteMode ? <PenOff /> : <Pen />}
          <span className="absolute -right-2 -top-2 bg-[#7091D5] h-6 w-6 text-sm rounded-full text-center text-foreground font-semibold">
            {noteMode ? "On" : "Off"}
          </span>
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
        {/* <Button
          disabled={noteMode}
          variant="outline"
          size="icon"
          className="h-11 w-11 md:h-14 md:w-14 text-[#7091D5]"
        >
          <Lightbulb />
        </Button> */}

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                disabled={noteMode}
                variant="outline"
                size="icon"
                className="h-11 w-11 md:h-14 md:w-14 text-[#7091D5] relative"
              >
                {/* <p className="absolute right-1 top-1 bg-blue-300 h-6 w-6 text-xs rounded-full text-center text-white font-semibold">
                  {maxHint}
                </p> */}
                <Lightbulb />
                <span className="absolute -right-2 -top-2 bg-[#7091D5] h-6 w-6 text-sm rounded-full text-center text-foreground font-semibold">
                  {maxHint - currenthintCount}
                </span>
              </Button>
            }
          />
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                Hint-Fill Current Selected Cell
              </DropdownMenuLabel>
              <DropdownMenuItem>
                <Button
                  onClick={handleHintAction}
                  disabled={noteMode}
                  variant="outline"
                  size="icon-sm"
                  className="w-full cursor-pointer"
                >
                  Ok
                </Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

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
