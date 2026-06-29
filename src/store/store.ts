import { create, type StateCreator } from "zustand";

//get value    const mainBoard = useGameStore((state) => state.gameBoard);

interface GameBoardSlice {
  gameBoard: number[][];
  setGameBoard: (newBoard: number[][]) => void;
}

interface SelectCellSlice {
  selectedCell: number[];
  setSelectedCell: (x: number, y: number) => void;
}

interface HighliteSameCellSlice {
  HighliteSameCell: Set<string>;
  updateHighliteSameCell: (updatedCells: Set<string>) => void;
}

type gameStore = GameBoardSlice & SelectCellSlice & HighliteSameCellSlice;

type AppSliceCreator<TSlice> = StateCreator<gameStore, [], [], TSlice>;

const createGameBoardSlice: AppSliceCreator<GameBoardSlice> = (set) => ({
  gameBoard: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0, 0],
    [3, 0, 0, 0, 0, 0, 0, 0, 0],
    [4, 0, 0, 0, 0, 1, 0, 0, 0],
    [5, 0, 0, 0, 0, 0, 0, 0, 0],
    [6, 0, 0, 0, 0, 0, 0, 0, 0],
    [7, 0, 0, 0, 0, 0, 0, 0, 0],
    [8, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  setGameBoard: (newBoard: number[][]) => set(() => ({ gameBoard: newBoard })),
});

const createSelectCellSlice: AppSliceCreator<SelectCellSlice> = (set) => ({
  selectedCell: [10, 10],
  setSelectedCell: (x: number, y: number) =>
    set(() => ({ selectedCell: [x, y] })),
});

const createHighliteSameCellSlice: AppSliceCreator<HighliteSameCellSlice> = (
  set,
) => ({
  HighliteSameCell: new Set(),
  updateHighliteSameCell: (updatedCells: Set<string>) =>
    set(() => ({ HighliteSameCell: updatedCells })),
});

//here we combine slice
export const useGameStore = create<gameStore>()((...a) => ({
  ...createGameBoardSlice(...a),
  ...createSelectCellSlice(...a),
  ...createHighliteSameCellSlice(...a),
}));
