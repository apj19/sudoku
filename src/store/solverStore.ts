import solveSudoku from "@/helper/solver";
import { create, type StateCreator } from "zustand";

type log = {
  event: "TRY" | "PLACE" | "BACKTRACK";
  coordinate: number[];
  value: number;
};

interface solverSlice {
  solverBoard: number[][];
  isSolving: boolean;
  speed: number;
  index: number;
  currentActiveCell: log | null;
  eventLog: log[];
  progress: number;

  setSolverBoard: (newBoard: number[][]) => void;
  setIsSolving: () => void;
  setSpeed: (newSpeed: number) => void;
  setIndex: (newIdx: number) => void;
  setEventLog: () => void;
  // setCurrentActiveCell: (x: number, y: number) => void;
  nextEvent: (delta: number) => void;
  startNewGame: (board: number[][]) => void;
}

interface solverDifficultySlice {
  solverGameDifficulty: "Beginner" | "easy" | "medium" | "hard";
  setSolverGameDifficulty: (
    getDifficulty: "Beginner" | "easy" | "medium" | "hard",
  ) => void;
  solverGameId: number; //this for when game changes it should trigger re render
  incrementSolverGameId: () => void;
}

type solverStore = solverSlice & solverDifficultySlice;

////
type AppSliceCreator<TSlice> = StateCreator<solverStore, [], [], TSlice>;
/////
const createSolverSlice: AppSliceCreator<solverSlice> = (set, get) => ({
  isSolving: false,
  solverBoard: [],
  speed: 100,
  index: -1,
  currentActiveCell: null,
  eventLog: [],
  progress: 0,
  setSolverBoard: (newBoard: number[][]) => {
    const { setEventLog } = get();
    set(() => ({ solverBoard: newBoard }));
    setEventLog();
    // setIndex(-1);
    // setSpeed(200);
  },

  setIsSolving: () => set((state) => ({ isSolving: !state.isSolving })),
  setSpeed: (newSpeed: number) => set(() => ({ speed: newSpeed })),
  setIndex: (newIdx: number) => {
    set(() => ({
      index: newIdx,
    }));
  },

  setEventLog: () =>
    set((state) => ({
      eventLog: solveSudoku(
        state.solverBoard.map((e) => [...e]),
        [],
      ),
    })),
  // setCurrentActiveCell: (x: number, y: number) =>
  //   set(() => ({ currentActiveCell: [x, y] as [number, number] })),

  nextEvent: (delta: number) => {
    const { index, eventLog, solverBoard } = get();
    const total = eventLog.length;
    const newIndex = index + delta;

    if (newIndex >= eventLog.length) {
      // console.log(eventLog);
      set({ isSolving: false });
      return;
    }

    const currentEvent = eventLog[newIndex];
    const newBoard = solverBoard.map((e) => [...e]);
    //setting current event value
    const [currX, currY] = currentEvent.coordinate;

    newBoard[currX][currY] = currentEvent.value;

    set({
      solverBoard: newBoard,
      index: newIndex,
      currentActiveCell: currentEvent,
      progress: total <= 1 ? 100 : Math.round((index / (total - 1)) * 100),
    });
  },

  startNewGame: (newBoard: number[][]) => {
    const { setSolverBoard } = get();
    setSolverBoard(newBoard);

    set({
      index: -1,
      isSolving: false,
      speed: 100,
      currentActiveCell: null,
      progress: 0,
    });
  },
});

const solverDifficultySlice: AppSliceCreator<solverDifficultySlice> = (
  set,
) => ({
  solverGameDifficulty: "Beginner",
  setSolverGameDifficulty: (getDifficulty) => {
    set(() => ({ solverGameDifficulty: getDifficulty }));
  },
  solverGameId: 0,
  incrementSolverGameId: () =>
    set((state) => ({ solverGameId: state.solverGameId + 1 })),
});

////main store

export const useSolverStore = create<solverStore>()((...a) => ({
  ...createSolverSlice(...a),
  ...solverDifficultySlice(...a),
}));

// const progress = useSolverStore((state) => {
//   // const total = state.eventLog.length;

//   // if (total <= 1) return 100;

//   // return Math.round((state.index / (total - 1)) * 100);

// });
