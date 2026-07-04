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
  const setGameId=useGameStore((state)=>state.incrementGameId);

  function handleClick(e:React.MouseEvent<HTMLDivElement>) {
    // setGameDifficulty("easy");
    // console.log(e.currentTarget.dataset.value);
    setGameDifficulty(e.currentTarget.dataset.value  as "easy" | "medium" | "hard");
    setGameId();
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
            <DropdownMenuItem data-value="easy" onClick={(e) => handleClick(e)}>
              Easy
            </DropdownMenuItem>
            <DropdownMenuItem data-value="medium" onClick={(e) => handleClick(e)}>
              Medium
            </DropdownMenuItem>
            <DropdownMenuItem data-value="hard" onClick={(e) => handleClick(e)}>
              Hard
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
