import { readFile } from "fs/promises";

const input = await readFile(new URL("./input.txt", import.meta.url), {
  encoding: "utf-8",
});

const regex = new RegExp(/mul\(\s*(\d+)\s*,\s*(\d+)\s*\)/, "g");

const matches = input.trimEnd().matchAll(regex);

const total = Array.from(matches).reduce((total, match) => {
  const [_full, number1, number2] = match;
  return total + parseInt(number1, 10) * parseInt(number2, 10);
}, 0);

console.log(total);
