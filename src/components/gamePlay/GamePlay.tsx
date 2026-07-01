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
        <div style={{ gridArea: "gameType" }}>
          <GameType />
        </div>
        <div style={{ gridArea: "gameState" }}>
          <GameState />
        </div>
        <div
          style={{ gridArea: "gameBoard" }}
          className="md:w-[50%] border border-amber-200"
        >
          <GameBoard />
        </div>
        <div style={{ gridArea: "controls" }}>
          <Controls />
        </div>
        <div style={{ gridArea: "numberPad" }}>
          <NumberPad />
        </div>
      </section>
    </>
  );
}
