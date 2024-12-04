import { readFile } from "fs/promises";

const input = await readFile(new URL("./input.txt", import.meta.url), {
  encoding: "utf-8",
});

const lines = input
  .trimEnd()
  .split("\r\n")
  .map((line) => line.split(""));

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

const rows = lines.length;
const columns = lines[0]?.length!;
const letters = ["X", "M", "A", "S"];

function isValidPosition(x: number, y: number) {
  return x >= 0 && x < rows && y >= 0 && y < columns;
}

function checkWord({
  x,
  y,
  dx,
  dy,
}: {
  x: number;
  y: number;
  dx: number;
  dy: number;
}) {
  let nx = 0;
  let ny = 0;
  for (let i = 0; i < letters.length; i++) {
    nx = x + i * dx;
    ny = y + i * dy;
    if (!isValidPosition(nx, ny) || lines[nx]![ny] !== letters[i]) {
      return false;
    }
  }
  return true;
}

let count = 0;

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < columns; col++) {
    for (const [dx, dy] of directions) {
      if (checkWord({ x: row, y: col, dx, dy })) {
        count++;
      }
    }
  }
}

console.log(count);
