// import Timer from "./Timer";

import { useEffect } from "react";
import Board from "./Board";
import SolverControls from "./SolverControls";
import "./solver.css";
import { useGameStore } from "@/store/store";
import { useNavigate } from "react-router-dom";
// import { Navigate, useLocation } from "react-router-dom";

export default function Solver() {
  const mainBoard = useGameStore((state) => state.gameBoard);
  const navigate = useNavigate();
  

  useEffect(() => {
    if (mainBoard.length == 0) {
      navigate("/");
    }

    //solve the sudoku

  }, []);

  return (
    <>
      <section className="solver-layout  p-4 ">
        <div style={{ gridArea: "solverBoard" }}>
          <Board />
        </div>

        <div className="sidebar-wrapper1">
          <div
            className=" border border-amber-100"
            style={{ gridArea: "solverControls" }}
          >
            <SolverControls />
          </div>

          <div style={{ gridArea: "gameState1" }}>
            <p>jhdgjkfxgkjdfh</p>
          </div>
        </div>
      </section>
    </>
  );
}
