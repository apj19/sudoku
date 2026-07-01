import { Button } from "@/components/ui/button";

export default function NumberPad() {
  return (
    <div className="flex items-center justify-between  min-h-12   border border-amber-100 w-full">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((e) => (
        <Button variant="outline" size={"lg"}>
          {e}
        </Button>
      ))}
    </div>
  );
}
