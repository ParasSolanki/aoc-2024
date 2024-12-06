import { readFile } from "fs/promises";

const input = await readFile(new URL("./input.txt", import.meta.url), {
  encoding: "utf-8",
});

const grid = input
  .trimEnd()
  .split("\r\n")
  .map((line) => line.trimEnd().split(""));

const directions = {
  up: { x: -1, y: 0 }, // up
  down: { x: 1, y: 0 }, // down
  left: { x: 0, y: -1 }, // left
  right: { x: 0, y: 1 }, // right
};

type Direction = keyof typeof directions;

const rows = grid.length;
const cols = grid[0]!.length;
const posX = grid.findIndex((row) => row.includes("^"));
let start = [posX, grid[posX]!.indexOf("^")];

function getNextPoint(point: number[], direction: Direction) {
  const next = [
    point[0]! + directions[direction].x,
    point[1]! + directions[direction].y,
  ];

  const inRange =
    next[0]! >= 0 && next[0]! < rows && next[1]! >= 0 && next[1]! < cols;

  if (!inRange) return { inRange };

  const value = grid[next[0]!]![next[1]!];

  if (value === "#") {
    direction =
      direction === "up"
        ? "right"
        : direction === "right"
        ? "down"
        : direction === "down"
        ? "left"
        : "up";
  }

  return {
    next,
    inRange,
    direction,
  };
}

function loop(point: number[]) {
  if (grid[point[0]!]![point[1]!] === "#") {
    return false;
  }

  const steps = new Set<string>();
  let currentPoint = start;
  let currentDirection = "up" as Direction;

  while (true) {
    const { next, inRange, direction } = getNextPoint(
      currentPoint,
      currentDirection
    );

    if (!inRange) break;

    if (currentDirection !== direction || point.join(",") === next.join(",")) {
      if (steps.has(`${currentPoint.join(",")}`)) {
        return true;
      }
      currentDirection = direction;

      steps.add(`${currentPoint.join(",")}`);
    } else {
      currentPoint = next;
    }
  }

  return false;
}

function run() {
  let total = 0;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (loop([y, x])) {
        total++;
      }
    }
  }

  console.log(total);
}

run();
