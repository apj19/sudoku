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

  setSolverBoard: (newBoard: number[][]) => void;
  setIsSolving: () => void;
  setSpeed: (newSpeed: number) => void;
  setIndex: (newIdx: number) => void;
  setEventLog: () => void;
  // setCurrentActiveCell: (x: number, y: number) => void;
  nextEvent: () => void;
}

type solverStore = solverSlice;

////
type AppSliceCreator<TSlice> = StateCreator<solverStore, [], [], TSlice>;
/////
const createSolverSlice: AppSliceCreator<solverSlice> = (set, get) => ({
  isSolving: false,
  solverBoard: [],
  speed: 200,
  index: -1,
  currentActiveCell: null,
  eventLog: [],
  setSolverBoard: (newBoard: number[][]) => {
    const { setEventLog } = get();
    set(() => ({ solverBoard: newBoard }));
    setEventLog();
    // setIndex(-1);
    // setSpeed(200);
  },

  setIsSolving: () => set((state) => ({ isSolving: !state.isSolving })),
  setSpeed: (newSpeed: number) => set(() => ({ speed: newSpeed })),
  setIndex: (newIdx: number) => set(() => ({ index: newIdx })),

  setEventLog: () =>
    set((state) => ({
      eventLog: solveSudoku(
        state.solverBoard.map((e) => [...e]),
        [],
      ),
    })),
  // setCurrentActiveCell: (x: number, y: number) =>
  //   set(() => ({ currentActiveCell: [x, y] as [number, number] })),

  nextEvent: () => {
    const { index, eventLog, solverBoard } = get();
    const newIndex = index + 1;

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
    });
  },
});

////main store

export const useSolverStore = create<solverStore>()((...a) => ({
  ...createSolverSlice(...a),
}));
