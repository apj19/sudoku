import { useEffect, useRef, useState } from "react";

import "./App.css";

import connectedCells, { sameCells } from "./helper/validationCheck";
import converttoBoardArray from "./helper/stringtoBoard";
// import axios from "axios";
import { tempDb } from "./helper/tempDb";
import solveSudoku from "./helper/solver";
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
  const solution = useRef<number[][]>(tempBoard);
  const [mainBoard, setMainBoard] = useState<number[][]>(tempBoard);
  const [focusedCell, setFocusedCell] = useState<Set<string>>(new Set());
  const [checkCellValue, setCheckCellValuel] = useState<Set<string>>(new Set());
  const [sameCellValue, setSameCellValue] = useState<Set<string>>(new Set());

  //texting counster
  const [counter, setCounter] = useState(100);
  const solvedEvents = useRef<log[]>([]);
  const [tryValue, setTryValue] = useState<logState>();

  function handleChange(
    row: number,
    col: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    console.log("changeEvent triggred");
    let newarray: number[][] = mainBoard.map((rows) => rows.map((e) => e));

    let currentinputValue: string = event.currentTarget.value.replace(
      /[^0-9]/g,
      ""
    );
    if (currentinputValue.length > 1) {
      currentinputValue = currentinputValue.slice(-1);
    }

    newarray[row][col] = Number(currentinputValue);
    const newSet = new Set<string>();
    if (newarray[row][col] != solution.current[row][col]) {
      newSet.add(`${row}${col}`);
    }
    setCheckCellValuel(newSet);
    setSameCellValue(new Set(sameCells(mainBoard, Number(currentinputValue))));

    setMainBoard(newarray);
  }

  function hanleClick(row: number, col: number) {
    console.log("click triggred");
    const connecteCellsList: string[] = connectedCells(row, col);
    const newSet = new Set<string>(connecteCellsList);
    // newSet.add(`${row}${col}`);
    // newSet.add("00");
    setFocusedCell(newSet);
    setSameCellValue(
      new Set(sameCells(mainBoard, Number(mainBoard[row][col])))
    );
  }

  async function fetchRandomBoard() {
    // try {
    //   let apiResponse = await axios.get("http://localhost:3000/");
    //   const data = await apiResponse.data;
    //   // console.log(data);
    //   // console.log(data.puzzle);
    //   let extractPuzzle: number[][] = converttoBoardArray(data.puzzle);
    //   solution.current = converttoBoardArray(data.solution);
    //   // console.log(solution.current);
    //   setMainBoard(extractPuzzle);
    // } catch (error) {
    //   console.log(error);
    // }

    const data = tempDb;
    const extractPuzzle: number[][] = converttoBoardArray(data.puzzle);
    solution.current = converttoBoardArray(data.solution);
    setMainBoard(extractPuzzle);
  }

  function handleSolver() {
    let newarray: number[][] = mainBoard.map((rows) => rows.map((e) => e));
    const events: log[] = solveSudoku(newarray, []);
    solvedEvents.current = events;
    // console.log(events);
    setCounter(0);
  }

  useEffect(() => {
    fetchRandomBoard();
  }, []);

  useEffect(() => {
    if (counter < 100) {
      const timer = setInterval(() => {
        let newarray: number[][] = mainBoard.map((rows) => rows.map((e) => e));
        let currntEvent: log = solvedEvents.current[counter];
        let row: number = currntEvent.coordinate[0];
        let col: number = currntEvent.coordinate[1];
        newarray[row][col] = currntEvent.value;

        // console.log(newarray);
        setMainBoard(newarray);
        setTryValue({ event: currntEvent.event, coordinate: `${row}${col}` });
        setCounter(counter + 1);
      }, 200);

      return () => clearInterval(timer);
    }
  }, [counter]);

  return (
    <>
      <p className="text-3xl font-bold underline mb-10 ">
        Click on the Vite and
      </p>

      <div className=" w-90 h-90 [&>*:nth-child(1)]:border-t-2  [&>*:nth-child(3n)]:border-b-2 text-black">
        {mainBoard.map((row, idx) => (
          <div
            key={idx}
            className="flex [&>*:nth-child(3n)]:border-r-2   [&>*:nth-child(1)]:border-l-2
      
      "
          >
            {" "}
            {row.map((col, cdx) => (
              <div
                key={cdx}
                className=" bg-[#ffffff] flex justify-center items-center  "
              >
                {" "}
                <input
                  className={`h-10 w-10   border border-gray-300 text-center cursor-pointer caret-transparent  
                     focus:bg-blue-300 
                     ${
                       checkCellValue.has(`${idx}${cdx}`)
                         ? "text-red-500"
                         : "text-black"
                     }
                     ${focusedCell.has(`${idx}${cdx}`) ? "bg-blue-100" : ""}
                     ${sameCellValue.has(`${idx}${cdx}`) ? "bg-blue-300" : ""}
                     ${
                       tryValue?.coordinate == `${idx}${cdx}`
                         ? solvingStyle[tryValue.event]
                         : ""
                     }

                     `}
                  type="text"
                  value={col == 0 ? "" : col}
                  onChange={(event) => handleChange(idx, cdx, event)}
                  onClick={() => hanleClick(idx, cdx)}
                />{" "}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        <button
          type="button"
          className="text-white mt-10 bg-blue-400 box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none"
          onClick={handleSolver}
        >
          Solve It!
        </button>
        <div>counster-{counter}</div>
      </div>
    </>
  );
}

export default App;
