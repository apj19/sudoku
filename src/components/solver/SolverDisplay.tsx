import StatesTable from "./StatesTable";

export default function SolverDisplay() {
  // const states = useSolverStore((state) => state.States);
  return (
    <section className="w-full  px-2  text-sm   ">
      <p className="text-forgound  py-2">
        Live statistics of the solver's search process. These values update as
        the algorithm explores, places numbers, and backtracks
      </p>
      <div className="flex  flex-col ">
        {/* <div className="flex gap-4 text-amber-600">
          <p>Value Tried:</p>
          <p>{states.ValueTried[0]}</p>
          <p>vs</p>
          <p>{states.ValueTried[1]}</p>
        </div>
        <div className="flex gap-4 text-green-600">
          <p>Value Placed:</p>
          <p>{states.ValuePLaced[0]}</p>
          <p>vs</p>
          <p>{states.ValuePLaced[1]}</p>
        </div>
        <div className="flex gap-4 text-destructive">
          <p>Value BackTracked:</p>
          <p>{states.ValueBackTracked[0]}</p>
          <p>vs</p>
          <p>{states.ValueBackTracked[1]}</p>
        </div> */}
        <StatesTable />
      </div>
    </section>
  );
}
