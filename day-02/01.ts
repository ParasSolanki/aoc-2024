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

let safeReports = 0;

for (const line of lines) {
  let isSafe = true;
  let action = undefined;

  for (let i = 0; i < line.length - 1; i++) {
    const diff = line[i] - line[i + 1];

    const newAction = diff > 0 ? "decrease" : "increase";

    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
      isSafe = false;
      break;
    }

    if (action && newAction !== action) {
      isSafe = false;
      break;
    }

    action = newAction;
  }

  if (isSafe) safeReports += 1;
}

console.log({ safeReports });
