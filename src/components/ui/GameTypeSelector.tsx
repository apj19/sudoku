import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGameStore } from "@/store/store";

export default function GameTypeSelector() {
  const setGameDifficulty = useGameStore((state) => state.setDifficulty);

  function handleClick() {
    setGameDifficulty("easy");
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button size={"lg"} variant="secondary">
              New Game
            </Button>
          }
        />
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Game Types</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setGameDifficulty("easy")}>
              Easy
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setGameDifficulty("medium")}>
              Medium
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setGameDifficulty("hard")}>
              Hard
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
