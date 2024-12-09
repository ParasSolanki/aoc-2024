import { readFile } from "fs/promises";

const input = await readFile(new URL("./input.txt", import.meta.url), {
  encoding: "utf-8",
});

const grid = input
  .trim()
  .split("\n")
  .map((line) => line.trim().split(""));

function run(grid: string[][]) {
  const rows = grid.length;
  const cols = grid[0]!.length;

  const antennas = {} as Record<string, Array<Array<number>>>;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const ch = grid[i]![j]!;

      if (ch === ".") continue;

      if (!antennas[ch]) antennas[ch] = [];

      antennas[ch].push([i, j]);
    }
  }

  const locations = new Set<string>();

  function placeAntinode(x: number, y: number) {
    if (x < 0 || x >= rows || y < 0 || y >= cols) return;

    if (grid[x]![y] === "#") return;

    locations.add(`${x},${y}`);

    if (grid[x]![y] === ".") grid[x]![y] = "#";
  }

  for (const [antenna, value] of Object.entries(antennas)) {
    for (let i = 0; i < value.length; i++) {
      const currentAntenna = value[i]!;
      for (let j = 0; j < value.length; j++) {
        if (i === j) continue;

        const anotherAntenna = value[j]!;

        const [x1, y1] = currentAntenna;
        const [x2, y2] = anotherAntenna;

        const diffX = x2! - x1!;
        const diffY = y2! - y1!;

        const an1 = [x1! - diffX, y1! - diffY];
        const an2 = [x2! + diffX, y2! + diffY];

        placeAntinode(an1[0]!, an1[1]!);
        placeAntinode(an2[0]!, an2[1]!);
      }
    }
  }

  console.log(locations.size);
}

run(grid);
