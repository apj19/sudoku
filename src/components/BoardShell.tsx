import type { ReactNode } from "react";

export default function BoardShell({ children }: { children: ReactNode }) {
  return (
    <div className=" grid grid-cols-9 grid-rows-9 aspect-square w-full max-w-125  border-2 border-foreground/50 relative  ">
      {children}
    </div>
  );
}
