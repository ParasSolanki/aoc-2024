import { readFile } from "fs/promises";

const input = await readFile(new URL("./input.txt", import.meta.url), {
  encoding: "utf-8",
});

const list1 = {} as Record<number, number>;
const list2 = {} as Record<number, number>;

input.split("\r\n").forEach((line) => {
  const [number1, number2] = line.split("  ");

  const parsedNumber1 = parseInt(number1!?.trim(), 10);
  const parsedNumber2 = parseInt(number2!?.trim(), 10);

  list1[parsedNumber1] = 0;

  list2[parsedNumber2] = list2[parsedNumber2] ? list2[parsedNumber2] + 1 : 1;
});

let total = 0;

Object.keys(list1).forEach((key) => {
  const k = Number(key);
  let sub = 0;

  if (key && list2[k]) {
    sub = k * list2[k];
  }

  total += sub;
});

console.log(total);
