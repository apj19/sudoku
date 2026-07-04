import Controls from "./Controls";
import GameBoard from "./GameBoard";
import GameState from "./GameState";
import GameType from "./GameType";
import NumberPad from "./NumberPad";
import "./gamePlay.css";

export default function GamePlay() {
  return (
    <>
      <section className="game-layout  p-4 ">
        <div style={{ gridArea: "gameBoard" }}>
          <GameBoard />
        </div>

        <div className="sidebar-wrapper ">
          <div style={{ gridArea: "gameType" }}>
            <GameType />
          </div>
          <div style={{ gridArea: "gameState" }}>
            <GameState />
          </div>

          <div style={{ gridArea: "controls" }}>
            <Controls />
          </div>
          <div className="md:h-[75%]" style={{ gridArea: "numberPad" }}>
            <NumberPad />
          </div>
        </div>
      </section>
    </>
  );
}
