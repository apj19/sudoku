# Sudoku GamePlay and Solver

[Demo Link](https://sudoku-sigma-sandy.vercel.app/)

## Main features-Sudoku Game

1. Main game page with board and controles
2. fully Responsive Design
3. Select and change value on cell
4. Highlight same cell value in grid
5. Highligh connected grid Cells
6. mistake Counter
7. Timer start/Pause
8. Delete value in cell
9. Pause and Resume Game
10. Undo Action
11. Erease Action
12. Notes modes
13. Highlite wrong notes values
14. Hint-Fill current selected cell
15. Once All number placed Iinactive corrsponing number

## Solver Features

1. Solve Sudoku using Backtracking algorithm and MRV algorithm
2. Solving animation for both algorthm
3. Comparison of Both algorithm
4. progress bar of total steps
5. start/pause, Next, Prev , Speed controls

## Algorithim Features

1. backtracking- simple backtracking used for solving sudoku
2. MRV (Minimum Remaining Values) is used for optimizing the backtracking algorithm
3. Genereated unique game board from Seed value from 1.8 Billion possibilites that will make sure the same puzzel will not repeate at all.
4. For creating board use FisherYatesShuffle algorithm which make sure the possblities generation will be uniform , whcih math.ranom misses.

## Tech stack

1. React
2. Shadcn
3. Tailwind CSS
4. Zustand
5. React Router
