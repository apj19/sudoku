import { Button } from "@/components/ui/button";

// export function ButtonSecondary() {
//   return <Button variant="secondary">Secondary</Button>
// }

export default function GameType() {
  return (
    <div className="flex  justify-between items-center min-h-8 md:min-h-12    ">
      <p>Easy</p>

      <Button size={"lg"} variant="secondary">
        New Game
      </Button>
    </div>
  );
}
