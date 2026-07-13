import { useId } from "react";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSolverStore } from "@/store/solverStore";

export default function SolverSelector() {
  const id = useId();

  const items = [
    { label: "Solver Algorithim", value: null },
    { label: "Backtracking", value: "Backtracking" },
    { label: "MRV", value: "MRV" },
  ];

  // "Backtracking" | "MRV"
  function handleSolver(value: "Backtracking" | "MRV") {
    const setSolverAlgorithim = useSolverStore.getState().setAlgorithm;
    setSolverAlgorithim(value);
  }

  return (
    <>
      <section className="w-full  flex justify-center items-center">
        <div>
          <div className="w-full max-w-xs space-y-2">
            <Label htmlFor={id}>Select Sudoku Solving Algorithim</Label>
            <Select
              items={items}
              defaultValue="Backtracking"
              onValueChange={(v) => handleSolver(v as "Backtracking" | "MRV")}
            >
              <SelectTrigger className="w-full border-sky-600 bg-sky-600/10 text-sky-600 shadow-none focus-visible:border-sky-600 focus-visible:ring-sky-600/20 dark:bg-sky-400/10 dark:text-sky-400 dark:hover:bg-sky-400/10 dark:focus-visible:ring-sky-400/40 [&_svg]:text-sky-600! dark:[&_svg]:text-sky-400!">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="*:data-[slot=select-item]:not-data-[variant=destructive]:focus:**:text-sky-600 dark:*:data-[slot=select-item]:not-data-[variant=destructive]:focus:**:text-sky-400 [&_div:focus]:bg-sky-600/20 dark:[&_div:focus]:bg-sky-400/20">
                  <SelectLabel>Solver</SelectLabel>
                  {items.slice(1).map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>
    </>
  );
}
