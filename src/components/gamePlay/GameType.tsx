import { Button } from "@/components/ui/button";

// export function ButtonSecondary() {
//   return <Button variant="secondary">Secondary</Button>
// }

export default function GameType() {
  return (
    <div className="flex  justify-between items-center min-h-6 px-2 border border-amber-100">
      <p>Easy</p>

      <Button variant="secondary">New Game</Button>
    </div>
  );
}
