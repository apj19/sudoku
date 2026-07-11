import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronsUpIcon,
  ChevronUpIcon,
  EqualIcon,
  ChevronDownIcon,
  ChevronsDownIcon,
} from "lucide-react";

interface GameTypeProps {
  setDiffictly: (value: "Beginner" | "easy" | "medium" | "hard") => void;
  setGameId: () => void;
}

export default function GameTypeSelect({
  setDiffictly,
  setGameId,
}: GameTypeProps) {
  const listItems = [
    {
      icon: <ChevronsUpIcon />,
      color: "*:[svg]:text-destructive",
      priority: "Extream",
      gametype: "hard",
    },
    {
      icon: <ChevronUpIcon />,
      color: "*:[svg]:text-destructive/60",
      priority: "Hard",
      gametype: "hard",
    },
    {
      icon: <EqualIcon />,
      color: "*:[svg]:text-amber-600 dark:*:[svg]:text-amber-400",
      priority: "Medium",
      gametype: "medium",
    },
    {
      icon: <ChevronDownIcon />,
      color: "*:[svg]:text-green-600/60 dark:*:[svg]:text-green-400/60",
      priority: "Easy",
      gametype: "easy",
    },
    {
      icon: <ChevronsDownIcon />,
      color: "*:[svg]:text-green-600 dark:*:[svg]:text-green-400",
      priority: "Beginner",
      gametype: "Beginner",
    },
  ];

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    // setGameDifficulty("easy");
    // console.log(e.currentTarget.dataset.value);
    // setGameDifficulty(
    //   e.currentTarget.dataset.value as "Beginner" | "easy" | "medium" | "hard",
    // );
    // setGameId();

    setDiffictly(
      e.currentTarget.dataset.value as "Beginner" | "easy" | "medium" | "hard",
    );
    setGameId();

    console.log(e.currentTarget.dataset.value);
  }

  return (
    <section>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="outline">New Game</Button>}
        />
        <DropdownMenuContent className="w-56 shadow-none">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Game Type</DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            {listItems.map((item, index) => (
              <DropdownMenuItem
                key={index}
                data-value={item.gametype}
                onClick={(e) => handleClick(e)}
              >
                <span className={item.color}>{item.icon}</span>
                {item.priority}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
}
