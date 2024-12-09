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

  function generateAninodeCorrdinates({
    x,
    y,
    diffX,
    diffY,
    rows,
    cols,
    operation,
  }: {
    x: number;
    y: number;
    diffX: number;
    diffY: number;
    rows: number;
    cols: number;
    operation: "add" | "subtract";
  }) {
    const corrds = [] as number[][];
    let validCorrds = true;
    do {
      if (x < 0 || x >= rows || y < 0 || y >= cols) {
        validCorrds = false;
        break;
      }

      corrds.push([x, y]);

      if (operation === "add") {
        x += diffX;
        y += diffY;
      } else {
        x -= diffX;
        y -= diffY;
      }
    } while (validCorrds);

    return corrds;
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

        const an1 = generateAninodeCorrdinates({
          x: x1!,
          y: y1!,
          diffX,
          diffY,
          rows,
          cols,
          operation: "subtract",
        });
        const an2 = generateAninodeCorrdinates({
          x: x2!,
          y: y2!,
          diffX,
          diffY,
          rows,
          cols,
          operation: "add",
        });

        an1.forEach((corrd) => placeAntinode(corrd[0]!, corrd[1]!));
        an2.forEach((corrd) => placeAntinode(corrd[0]!, corrd[1]!));
      }
    }
  }

  console.log(locations.size);
}

run(grid);
