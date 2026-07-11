import { Route, Routes } from "react-router-dom";

import "./App.css";

import Header from "./components/Header";
import GamePlay from "./components/gamePlay/GamePlay";
import Solver from "./components/solver/Solver";
import NotFound from "./components/NotFound";

function App() {
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
