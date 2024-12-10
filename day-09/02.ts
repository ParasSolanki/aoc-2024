import { readFile } from "fs/promises";

const input = await readFile(new URL("./input.txt", import.meta.url), {
  encoding: "utf-8",
});

const disk = input
  .trim()
  .split("")
  .map((ch) => parseInt(ch, 10));

function findLeftmostSpace(
  blocks: (number | null)[],
  start: number,
  neededLength: number
): number | null {
  let i = 0;
  while (i < start) {
    if (blocks[i] === null) {
      const spaceStart = i;
      let length = 0;
      while (i < start && blocks[i] === null) {
        length++;
        i++;
      }
      if (length >= neededLength) {
        return spaceStart;
      }
      i++;
    } else {
      i++;
    }
  }
  return null;
}

function compact(blocks: (number | null)[]): (number | null)[] {
  const files = [] as [number, number][];
  let index = 0;

  while (index < blocks.length) {
    // Skip None/null blocks
    while (index < blocks.length && blocks[index] === null) {
      index++;
    }

    // If we've reached the end, break
    if (index >= blocks.length) break;

    // Start of a file span
    const start = index;
    const fileId = blocks[index];

    // Find the length of this file span
    while (index < blocks.length && blocks[index] === fileId) {
      index++;
    }

    files.push([start, index - start]);
  }

  // Iterate through file spans in reverse order
  for (let fileId = files.length - 1; fileId >= 0; fileId--) {
    const [start, length] = files[fileId]!;

    // Try to find a leftmost space to move the file
    const newStart = findLeftmostSpace(blocks, start, length);

    if (newStart !== null) {
      // Create an array of file blocks
      const fileBlocks = Array(length).fill(fileId);

      // Move the file blocks to the new location
      blocks.splice(newStart, length, ...fileBlocks);

      // Clear the original location
      blocks.splice(start, length, ...Array(length).fill(null));
    }
  }

  return blocks;
}

function run(disk: number[]) {
  const blocks = Array.from({
    length: disk.reduce((acc, curr) => (acc += curr), 0),
  }).fill(null) as Array<string | null>;

  let fileId = 0;
  let loc = 0;
  for (let i = 0; i < disk.length; i++) {
    const val = disk[i]!;
    const isNotFreeSpace = i % 2;

    const newLoc = loc + val;

    if (isNotFreeSpace === 0) {
      blocks.fill(fileId.toString(), loc, newLoc);
      fileId++;
    }
    loc = newLoc;
  }

  console.log(
    compact(blocks).reduce((acc, curr, index) => {
      if (curr === null) return acc;

      acc += parseInt(curr, 10) * index;

      return acc;
    }, 0)
  );
}

run(disk);
