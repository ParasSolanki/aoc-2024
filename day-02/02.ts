import { readFile } from "fs/promises";

const input = await readFile(new URL("./input.txt", import.meta.url), {
  encoding: "utf-8",
});

const lines = input.split("\r\n").map((line) =>
  line
    .trim()
    .split(" ")
    .map((ch) => parseInt(ch, 10))
);

function isSafeLine(nums: number[]) {
  const differences = nums.map((n, i) => n - nums[i - 1]);
  differences.shift();
  return (
    differences.every((d) => d >= -3 && d < 0) ||
    differences.every((d) => d <= 3 && d > 0)
  );
}
console.log(
  lines.filter((nums) => {
    if (isSafeLine(nums)) return true;

    for (let i = 0; i < nums.length; i++) {
      if (isSafeLine(nums.toSpliced(i, 1))) return true;
    }
  }).length
);
