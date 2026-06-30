import { Button } from "@/components/ui/button";
import { useGameStore } from "@/store/store";

export default function Controls() {
  // const isSolving = useGameStore((state) => state.isSolving);
  const solve = useGameStore((state) => state.setIsSolving);
  const solveBoard = useGameStore((state) => state.setEventLog);
  const updateHighliteCells = useGameStore(
    (state) => state.updateHighliteSameCell,
  );

  function handleClick() {
    updateHighliteCells(0);
    console.log("solving clicked");
    // solveBoard();

    solveBoard();

    solve();
  }

  return (
    <>
      <Button onClick={handleClick} variant="outline">
        Button
      </Button>
    </>
  );
}
