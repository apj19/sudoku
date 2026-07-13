// import Timer from "./Timer";

import { useEffect } from "react";

import SolverControls from "./SolverControls";
import "./solver.css";
import { useGameStore } from "@/store/store";
import { useNavigate } from "react-router-dom";
import SolverBoard from "./SolverBoard";
import SolverSelector from "./SolverSelector";
import SolverDisplay from "./SolverDisplay";
import SolverGame from "./SolverGame";
import SolverProgress from "./SolverProgress";
// import { Navigate, useLocation } from "react-router-dom";

export default function Solver() {
  // const mainBoard = useGameStore((state) => state.gameBoard);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (mainBoard.length == 0) {
  //     navigate("/");
  //   }

  //   //solve the sudoku
  // }, []);

  return (
    <>
      <section className="solver-layout  p-4 ">
        <div style={{ gridArea: "solverBoard" }}>
          <SolverBoard />
        </div>

        <div className="sidebar-wrapper1">
          <div className="w-full" style={{ gridArea: "solverSelector" }}>
            <SolverSelector />
          </div>

          <div
            className="   w-full   md:h-[48%]"
            style={{ gridArea: "solverDisplay" }}
          >
            <SolverDisplay />
          </div>

          <div className=" w-full" style={{ gridArea: "gameState1" }}>
            <SolverProgress />
          </div>

          <div className="  w-full" style={{ gridArea: "solverControls" }}>
            <SolverControls />
          </div>

          <div className=" w-full" style={{ gridArea: "solverGame" }}>
            <SolverGame />
          </div>
        </div>
      </section>
    </>
  );
}
