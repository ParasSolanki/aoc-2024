import { readFile } from "fs/promises";

const input = await readFile(new URL("./input.txt", import.meta.url), {
  encoding: "utf-8",
});

const lines = input
  .trimEnd()
  .split("\r\n")
  .map((line) => line.split(""));

function getLetter({ x, y }: { x: number; y: number }) {
  return lines?.[x]?.[y];
}

function getMasPattern({ x, y }: { x: number; y: number }) {
  return [
    `${getLetter({ x: x - 1, y: y - 1 })}${getLetter({ x, y })}${getLetter({
      x: x + 1,
      y: y + 1,
    })}`,
    `${getLetter({ x: x - 1, y: y + 1 })}${getLetter({ x, y })}${getLetter({
      x: x + 1,
      y: y - 1,
    })}`,
  ];
}

const rows = lines.length;
const columns = lines[0]?.length!;
let count = 0;

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < columns; col++) {
    const patterns = getMasPattern({ x: row, y: col });

    const isValid = patterns.every((p) => p === "MAS" || p === "SAM");

    if (isValid) {
      count++;
    }
  }
}

console.log(count);
