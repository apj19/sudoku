import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSolverStore } from "@/store/solverStore";

export default function StatesTable() {
  const algoStates = useSolverStore((state) => state.States);

  return (
    <>
      <div className="w-full overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-sky-600 ">States</TableHead>
              <TableHead className="text-sky-600">Backtracking</TableHead>
              <TableHead className="text-sky-600">MRV</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="odd:bg-muted/50">
              <TableCell className="font-medium">Value Tried</TableCell>
              <TableCell className="font-medium text-destructive">
                {algoStates.ValueTried[0]}
              </TableCell>
              <TableCell className="text-green-600">
                {algoStates.ValueTried[1]}
              </TableCell>
            </TableRow>

            <TableRow className="odd:bg-muted/50">
              <TableCell className="font-medium">Value Placed</TableCell>
              <TableCell className="font-medium text-destructive">
                {algoStates.ValuePLaced[0]}
              </TableCell>
              <TableCell className="text-green-600">
                {algoStates.ValuePLaced[1]}
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-muted/50">
              <TableCell className="font-medium ">Value BackTracked</TableCell>
              <TableCell className="font-medium text-destructive">
                {algoStates.ValueBackTracked[0]}
              </TableCell>
              <TableCell className="text-green-600">
                {algoStates.ValueBackTracked[1]}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}
