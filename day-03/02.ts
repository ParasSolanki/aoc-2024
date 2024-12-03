import { readFile } from "fs/promises";

const input = await readFile(new URL("./input.txt", import.meta.url), {
  encoding: "utf-8",
});

const regex = new RegExp(
  /(?:(mul|do|don't)\((\s*(\d*)\s*,?\s*(\d*)\s*)\))/,
  "g"
);

const matches = input.trimEnd().matchAll(regex);

let ignore = false;
let total = 0;

for (const match of Array.from(matches)) {
  const [_full, instruction, _, number1, number2] = match;

  if (instruction === "do") {
    ignore = false;
  } else if (instruction === "don't") {
    ignore = true;
  }

  if (!ignore && instruction === "mul") {
    total += parseInt(number1, 10) * parseInt(number2, 10);
  }
}

console.log(total);
