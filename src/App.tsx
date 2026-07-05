import { useEffect, useRef, useState } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";

import "./App.css";

import connectedCells, { sameCells } from "./helper/validationCheck";
import converttoBoardArray from "./helper/stringtoBoard";
// import axios from "axios";
import { tempDb } from "./helper/tempDb";
import solveSudoku from "./helper/solver";
import Header from "./components/Header";
import GamePlay from "./components/gamePlay/GamePlay";
import Solver from "./components/solver/Solver";
import NotFound from "./components/NotFound";
import SolverGuard from "./components/SolverGaurd";

type log = {
  event: "TRY" | "PLACE" | "BACKTRACK";
  coordinate: number[];
  value: number;
};
type logState = {
  event: "TRY" | "PLACE" | "BACKTRACK";
  coordinate: string;
};

const solvingStyle = {
  TRY: "bg-yellow-200",
  PLACE: "bg-green-200",
  BACKTRACK: "bg-red-200",
};

function App() {
  let tempBoard: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0, 0],
    [3, 0, 0, 0, 0, 0, 0, 0, 0],
    [4, 0, 0, 0, 0, 1, 0, 0, 0],
    [5, 0, 0, 0, 0, 0, 0, 0, 0],
    [6, 0, 0, 0, 0, 0, 0, 0, 0],
    [7, 0, 0, 0, 0, 0, 0, 0, 0],
    [8, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  // const solution = useRef<number[][]>(tempBoard);
  // const [mainBoard, setMainBoard] = useState<number[][]>(tempBoard);
  // const [focusedCell, setFocusedCell] = useState<Set<string>>(new Set());
  // const [checkCellValue, setCheckCellValuel] = useState<Set<string>>(new Set());
  // const [sameCellValue, setSameCellValue] = useState<Set<string>>(new Set());

  //texting counster
  const [counter, setCounter] = useState(100);
  const solvedEvents = useRef<log[]>([]);
  const [tryValue, setTryValue] = useState<logState>();

  // function handleChange(
  //   row: number,
  //   col: number,
  //   event: React.ChangeEvent<HTMLInputElement>,
  // ) {
  //   console.log("changeEvent triggred");
  //   let newarray: number[][] = mainBoard.map((rows) => rows.map((e) => e));

  //   let currentinputValue: string = event.currentTarget.value.replace(
  //     /[^0-9]/g,
  //     "",
  //   );
  //   if (currentinputValue.length > 1) {
  //     currentinputValue = currentinputValue.slice(-1);
  //   }

  //   newarray[row][col] = Number(currentinputValue);
  //   const newSet = new Set<string>();
  //   if (newarray[row][col] != solution.current[row][col]) {
  //     newSet.add(`${row}${col}`);
  //   }
  //   setCheckCellValuel(newSet);

  //   setSameCellValue(new Set(sameCells(mainBoard, Number(currentinputValue))));

  //   setMainBoard(newarray);
  // }

  // function hanleClick(row: number, col: number) {
  //   console.log("click triggred");
  //   const connecteCellsList: string[] = connectedCells(row, col);
  //   const newSet = new Set<string>(connecteCellsList);
  //   // newSet.add(`${row}${col}`);
  //   // newSet.add("00");
  //   setFocusedCell(newSet);
  //   setSameCellValue(
  //     new Set(sameCells(mainBoard, Number(mainBoard[row][col]))),
  //   );
  // }

  // function handleSolver() {
  //   let newarray: number[][] = mainBoard.map((rows) => rows.map((e) => e));
  //   const events: log[] = solveSudoku(newarray, []);
  //   solvedEvents.current = events;
  //   // console.log(events);
  //   setCounter(0);
  // }

  // useEffect(() => {
  //   if (counter < 100) {
  //     const timer = setInterval(() => {
  //       let newarray: number[][] = mainBoard.map((rows) => rows.map((e) => e));
  //       let currntEvent: log = solvedEvents.current[counter];
  //       let row: number = currntEvent.coordinate[0];
  //       let col: number = currntEvent.coordinate[1];
  //       newarray[row][col] = currntEvent.value;

  //       // console.log(newarray);
  //       setMainBoard(newarray);
  //       setTryValue({ event: currntEvent.event, coordinate: `${row}${col}` });
  //       setCounter(counter + 1);
  //     }, 100);

  //     return () => clearInterval(timer);
  //   }
  // }, [counter]);

  return (
    <>
      <Header />

      {/* //here will be paths
    /game
    /solve
    */}
      <section className="w-full">
        <Routes>
          <Route path="/" element={<GamePlay />} />
          <Route path="/solver" element={<Solver />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </section>
    </>
  );
}

export default App;
