import solveSudoku from "@/helper/solver";
import { sudokuOptimalSolver } from "@/helper/solver/MRVOptimal";
import { create, type StateCreator } from "zustand";

type log = {
  event: "TRY" | "PLACE" | "BACKTRACK";
  coordinate: number[];
  value: number;
};

type States = {
  ValueTried: number[];
  ValuePLaced: number[];
  ValueBackTracked: number[];
};

interface solverSlice {
  solverBoard: number[][];
  intialBoard: number[][];
  isSolving: boolean;
  speed: number;
  index: number;
  currentActiveCell: log | null;
  eventLog: log[];
  OptimalEventLog: log[];
  progress: number;
  States: States;
  algorithmSelect: "Backtracking" | "MRV";
  setAlgorithm: (algorithm: "Backtracking" | "MRV") => void;

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
  intialBoard: [],
  speed: 100,
  index: -1,
  currentActiveCell: null,
  eventLog: [],
  OptimalEventLog: [],
  progress: 0,
  States: { ValueTried: [0, 0], ValuePLaced: [0, 0], ValueBackTracked: [0, 0] },
  algorithmSelect: "Backtracking",
  setAlgorithm: (algorithm: "Backtracking" | "MRV") => {
    set(() => ({
      algorithmSelect: algorithm,
      index: -1,
      isSolving: false,
      speed: 100,
      currentActiveCell: null,
      progress: 0,
      solverBoard: get().intialBoard,
    }));

    // const { setEventLog } = get();

    // setEventLog();
  },
  setSolverBoard: (newBoard: number[][]) => {
    const { setEventLog } = get();
    set(() => ({
      solverBoard: newBoard,
      intialBoard: newBoard,
      index: -1,
      isSolving: false,
      speed: 100,
      currentActiveCell: null,
      progress: 0,
    }));
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

  setEventLog: () => {
    const { solverBoard } = get();
    const currentBoard = solverBoard.map((e) => [...e]);
    const MRVBoard = solverBoard.map((e) => [...e]);

    let backtrackingLogs: log[] = [];
    let MRVLogs: log[] = [];

    let BacktrackingvalueTried: number = 0;
    let BacktrackingvaluePLaced: number = 0;
    let BacktrackingvalueBackTracked: number = 0;

    backtrackingLogs = solveSudoku(currentBoard, []);

    for (let i = 0; i < backtrackingLogs.length; i++) {
      const event = backtrackingLogs[i];
      if (event.event === "TRY") {
        BacktrackingvalueTried++;
      } else if (event.event === "PLACE") {
        BacktrackingvaluePLaced++;
      } else if (event.event === "BACKTRACK") {
        BacktrackingvalueBackTracked++;
      }
    }

    /////////////////////////////////////////////////////////////////////////

    let MRVvalueTried: number = 0;
    let MRVvaluePLaced: number = 0;
    let MRVvalueBackTracked: number = 0;

    let res1 = sudokuOptimalSolver(MRVBoard, []);
    MRVLogs = res1.eventLog;
    // console.log(res1);

    for (let i = 0; i < MRVLogs.length; i++) {
      const event = MRVLogs[i];
      if (event.event === "TRY") {
        MRVvalueTried++;
      } else if (event.event === "PLACE") {
        MRVvaluePLaced++;
      } else if (event.event === "BACKTRACK") {
        MRVvalueBackTracked++;
      }
    }

    // console.log(MRVvaluePLaced);

    set(() =>
      //     {
      //   eventLog: solveSudoku(
      //     state.solverBoard.map((e) => [...e]),
      //     [],
      //   ),
      // }

      ({
        eventLog: backtrackingLogs,
        OptimalEventLog: MRVLogs,
        States: {
          ValueTried: [BacktrackingvalueTried, MRVvalueTried],
          ValuePLaced: [BacktrackingvaluePLaced, MRVvaluePLaced],
          ValueBackTracked: [BacktrackingvalueBackTracked, MRVvalueBackTracked],
        },
      }),
    );
  },
  // setCurrentActiveCell: (x: number, y: number) =>
  //   set(() => ({ currentActiveCell: [x, y] as [number, number] })),

  nextEvent: (delta: number) => {
    const { index, eventLog, solverBoard, algorithmSelect, OptimalEventLog } =
      get();

    let simulationLogs: log[] = [];

    if (algorithmSelect == "Backtracking") {
      simulationLogs = eventLog;
    } else {
      simulationLogs = OptimalEventLog;
    }

    const total = simulationLogs.length;
    const newIndex = index + delta;

    if (newIndex >= simulationLogs.length || newIndex < 0) {
      // console.log(eventLog);
      set({ isSolving: false });
      return;
    }

    const currentEvent = simulationLogs[newIndex];
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

    // set({
    //   index: -1,
    //   isSolving: false,
    //   speed: 100,
    //   currentActiveCell: null,
    //   progress: 0,
    // });
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
