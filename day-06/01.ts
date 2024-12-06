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

const steps = new Set<string>();
const rows = grid.length;
const cols = grid[0]!.length;

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

function run() {
  const posX = grid.findIndex((row) => row.includes("^"));
  let currentPoint = [posX, grid[posX]!.indexOf("^")];
  let currentDirection = "up" as Direction;

  steps.add(`${currentPoint.join(",")}`);

  while (true) {
    const { next, inRange, direction } = getNextPoint(
      currentPoint,
      currentDirection
    );

    if (!inRange) break;

    if (currentDirection !== direction) {
      currentDirection = direction;
    } else {
      currentPoint = next;
      steps.add(`${next.join(",")}`);
    }
  }

  console.log(steps.size);
}

run();
