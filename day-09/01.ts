import { readFile } from "fs/promises";

const input = await readFile(new URL("./input.txt", import.meta.url), {
  encoding: "utf-8",
});

const disk = input
  .trim()
  .split("")
  .map((ch) => parseInt(ch, 10));

function compact(blocks: Array<string | null>) {
  let right = blocks.length - 1;
  let left = 0;

  // Remove trailing null elements
  while (right >= 0 && blocks[right] === null) {
    right--;
  }

  // Skip initial non . elements
  while (left < right && blocks[left] !== null) {
    left++;
  }

  // Compact the array
  while (right >= 0 && left < right) {
    blocks[left] = blocks[right];
    blocks[right] = null;
    right--;
    left++;

    // Find next non . element from right
    while (right >= 0 && blocks[right]! === null) {
      right--;
    }

    // Find next . element from left
    while (left < right && blocks[left]! !== null) {
      left++;
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
