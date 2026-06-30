import Controls from "./Controls";
import GameBoard from "./GameBoard";
import GameState from "./GameState";
import GameType from "./GameType";
import NumberPad from "./NumberPad";
import "./gamePlay.css";

export default function GamePlay() {
  return (
    <>
      <section className="game-layout  m-4 p-2">
        <div style={{ gridArea: "gameType" }}>
          <GameType />
        </div>
        <div style={{ gridArea: "gameState" }}>
          <GameState />
        </div>
        <div style={{ gridArea: "gameBoard" }} className=" ">
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
