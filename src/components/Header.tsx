import { IconBrandGithub } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";

export default function Header() {
  return (
    <>
      <section className="flex items-center justify-between  min-h-18 sm:min-h-24 md:min-h-28 text-3xl sm:text-4xl md:text-5xl font-semibold px-4 text-center">
        <Link to="/" className="text-foreground">
          Sudoku
        </Link>

        <div className="flex justify-center items-center  gap-4">
          {/* <ModeToggle /> */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/apj19/sudoku"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandGithub size={26} stroke={1} className="" />
            </a>
          </div>

          <div className="flex items-center justify-center ">
            <ModeToggle />
          </div>
        </div>
      </section>
    </>
  );
}
