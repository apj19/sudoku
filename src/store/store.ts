import connectedCells, { sameCells } from "@/helper/validationCheck";
import { create, type StateCreator } from "zustand";

//get value    const mainBoard = useGameStore((state) => state.gameBoard);

interface GameBoardSlice {
  gameBoard: number[][];
  setGameBoard: (newBoard: number[][]) => void;
}

interface SelectCellSlice {
  selectedCell:  [number, number] | null;
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

type gameStore = GameBoardSlice &
  SelectCellSlice &
  HighliteSameCellSlice &
  connectCellSlice;

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

//here we combine slice
export const useGameStore = create<gameStore>()((...a) => ({
  ...createGameBoardSlice(...a),
  ...createSelectCellSlice(...a),
  ...createHighliteSameCellSlice(...a),
  ...createConnectCellSlice(...a),
}));

// updateHighliteCells(new Set(sameCells(updatedBoard, Number(cellValue))));
