import solveSudoku from "@/helper/solver";
import connectedCells, { sameCells } from "@/helper/validationCheck";
import { create, type StateCreator } from "zustand";

//get value    const mainBoard = useGameStore((state) => state.gameBoard);

interface GameBoardSlice {
  gameBoard: number[][];
  initialBoard: number[][];
  setGameBoard: (newBoard: number[][]) => void;
  updateGameBoardWithCoordinate: (x: number, y: number, value: number) => void;
  setInitialBoard: (newBoard: number[][]) => void;
  startNewGame: (newGame: number[][]) => void;
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

const createGameBoardSlice: AppSliceCreator<GameBoardSlice> = (set, get) => ({
  gameBoard: [],
  initialBoard: [],
  setInitialBoard: (newBoard: number[][]) =>
    set(() => ({ initialBoard: newBoard })),
  setGameBoard: (newBoard: number[][]) => set(() => ({ gameBoard: newBoard })),
  updateGameBoardWithCoordinate: (x: number, y: number, value: number) => {
    const { gameBoard, updateHighliteSameCell } = get();
    const updatedBoard: number[][] = gameBoard.map((e) => [...e]);
    if (updatedBoard[x][y] == value) {
      updatedBoard[x][y] = 0;
      updateHighliteSameCell(0);
    } else {
      updatedBoard[x][y] = value;
      updateHighliteSameCell(value);
    }

    set({ gameBoard: updatedBoard });
  },

  startNewGame: (newGame: number[][]) => {
    const { setInitialBoard, setGameBoard } = get();

    setInitialBoard(newGame); //this will save initial state of board
    //set main game board
    setGameBoard(newGame);
    //default select cell state

    set({
      selectedCell: null,
      HighliteSameCell: new Set(),
      connectCell: new Set(),
    });
  },
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
//   setSpeed:(newSpeed:number)=> void
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
