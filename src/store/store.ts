import solveSudoku from "@/helper/solver";
import connectedCells, { sameCells } from "@/helper/validationCheck";
import { create, type StateCreator } from "zustand";

//get value    const mainBoard = useGameStore((state) => state.gameBoard);

interface GameBoardSlice {
  gameBoard: number[][];
  setGameBoard: (newBoard: number[][]) => void;
}

interface SelectCellSlice {
  selectedCell: [number, number] | null;
  setSelectedCell: (x: number, y: number) => void;
}

interface HighliteSameCellSlice {
  HighliteSameCell: Set<string>;
  updateHighliteSameCell: (cellValue: number) => void;
}

interface connectCellSlice {
  connectCell: Set<string>;
  updateConnectCell: (x: number, y: number) => void;
}
type log = {
  event: "TRY" | "PLACE" | "BACKTRACK";
  coordinate: number[];
  value: number;
};

interface solverSlice {
  isSolving: boolean;
  speed: number;
  index: number;
  currentActiveCell: log | null;
  eventLog: log[];

  setIsSolving: () => void;
  setSpeed: (newSpeed: number) => void;
  setIndex: (newIdx: number) => void;
  setEventLog: () => void;
  // setCurrentActiveCell: (x: number, y: number) => void;
  nextEvent: () => void;
}

type gameStore = GameBoardSlice &
  SelectCellSlice &
  HighliteSameCellSlice &
  connectCellSlice &
  solverSlice;

type AppSliceCreator<TSlice> = StateCreator<gameStore, [], [], TSlice>;

const createGameBoardSlice: AppSliceCreator<GameBoardSlice> = (set) => ({
  gameBoard: [
    [0, 4, 2, 1, 5, 7, 0, 3, 8],
    [9, 3, 1, 2, 8, 6, 5, 7, 4],
    [7, 8, 5, 3, 9, 4, 1, 6, 2],
    [1, 6, 8, 5, 2, 3, 7, 4, 9],
    [3, 5, 4, 7, 0, 9, 8, 2, 6],
    [2, 7, 9, 6, 4, 8, 3, 1, 5],
    [8, 2, 3, 4, 7, 5, 6, 9, 1],
    [4, 9, 6, 8, 3, 1, 2, 5, 7],
    [5, 1, 7, 9, 6, 2, 4, 0, 0],
  ],
  setGameBoard: (newBoard: number[][]) => set(() => ({ gameBoard: newBoard })),
});

const createSelectCellSlice: AppSliceCreator<SelectCellSlice> = (set) => ({
  selectedCell: null,
  setSelectedCell: (x: number, y: number) =>
    set(() => ({ selectedCell: [x, y] as [number, number] })),
});

const createHighliteSameCellSlice: AppSliceCreator<HighliteSameCellSlice> = (
  set,
) => ({
  HighliteSameCell: new Set(),
  updateHighliteSameCell: (cellValue) =>
    set((state) => ({
      HighliteSameCell:
        cellValue == 0
          ? new Set()
          : new Set(sameCells(state.gameBoard, cellValue)),
    })),
});

const createConnectCellSlice: AppSliceCreator<connectCellSlice> = (set) => ({
  connectCell: new Set(),
  updateConnectCell: (x: number, y: number) =>
    set(() => ({ connectCell: new Set<string>(connectedCells(x, y)) })),
});

// interface solverSlice{
//   isSolving:boolean,
//   speed:number,
//   index:number,
//   currentActiveCell:  [number, number] | null;
//   eventLog:log[],

//   setIsSolving:()=>void,
//   setSpeed:(newspeed:number)=> void
//   setIndex:(newIdx:number)=> void
//   setEventLog:()=> void
// }

const createSolverSlice: AppSliceCreator<solverSlice> = (set, get) => ({
  isSolving: false,
  speed: 400,
  index: -1,
  currentActiveCell: null,
  eventLog: [],
  setIsSolving: () => set((state) => ({ isSolving: !state.isSolving })),
  setSpeed: (newSpeed: number) => set(() => ({ speed: newSpeed })),
  setIndex: (newIdx: number) => set(() => ({ index: newIdx })),

  setEventLog: () =>
    set((state) => ({
      eventLog: solveSudoku(
        state.gameBoard.map((e) => [...e]),
        [],
      ),
    })),
  // setCurrentActiveCell: (x: number, y: number) =>
  //   set(() => ({ currentActiveCell: [x, y] as [number, number] })),

  nextEvent: () => {
    const { index, eventLog, gameBoard } = get();
    const newIndex = index + 1;

    if (newIndex >= eventLog.length) {
      // console.log(eventLog);
      set({ isSolving: false });
      return;
    }

    const currentEvent = eventLog[newIndex];
    const newBoard = gameBoard.map((e) => [...e]);
    //setting current event value
    const [currX, currY] = currentEvent.coordinate;

    newBoard[currX][currY] = currentEvent.value;

    set({
      gameBoard: newBoard,
      index: newIndex,
      currentActiveCell: currentEvent,
    });
  },
});

//here we combine slice
export const useGameStore = create<gameStore>()((...a) => ({
  ...createGameBoardSlice(...a),
  ...createSelectCellSlice(...a),
  ...createHighliteSameCellSlice(...a),
  ...createConnectCellSlice(...a),
  ...createSolverSlice(...a),
}));

// updateHighliteCells(new Set(sameCells(updatedBoard, Number(cellValue))));
