import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSolverStore } from "@/store/solverStore";
import { Gauge, Snail, Turtle, Scooter, Rabbit } from "lucide-react";

export default function SpeedSelector() {
  //   const SPEED = {
  //     "1x": 200,
  //     "2x": 100,
  //     "4x": 50,
  //     "8x": 25,
  //   };

  const listItems = [
    {
      icon: <Snail />,
      color: "*:[svg]:text-green-600/60 dark:*:[svg]:text-green-400/60",
      speedMultiplier: "1x",
      speedValue: 200,
    },

    {
      icon: <Turtle />,
      color: "*:[svg]:text-destructive/60",
      speedMultiplier: "2x",
      speedValue: 100,
    },
    {
      icon: <Scooter />,
      color: "*:[svg]:text-amber-600 dark:*:[svg]:text-amber-400",
      speedMultiplier: "4x",
      speedValue: 50,
    },

    {
      icon: <Rabbit />,
      color: "*:[svg]:text-destructive",
      speedMultiplier: "8x",
      speedValue: 25,
    },
  ];

  function handleSpeed(e: React.MouseEvent<HTMLDivElement>) {
    const updateSolverSpeed = useSolverStore.getState().setSpeed;
    updateSolverSpeed(Number(e.currentTarget.dataset.value) || 200);
    console.log(e.currentTarget.dataset.value);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              // onClick={handleEraseCell}
              variant="outline"
              size="icon"
              className="h-11 w-11 md:h-14 md:w-14 text-blue-500"
            >
              <Gauge />
            </Button>
          }
        />
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel> Speed Multipler</DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            {listItems.map((item, index) => (
              <DropdownMenuItem
                key={index}
                data-value={item.speedValue}
                onClick={(e) => handleSpeed(e)}
              >
                <span className={item.color}>{item.icon}</span>
                {item.speedMultiplier}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
