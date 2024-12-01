import { readFile } from "fs/promises";

const input = await readFile(new URL("./input.txt", import.meta.url), {
  encoding: "utf-8",
});

const list = [[], []] as Array<Array<number>>;

input.split("\r\n").forEach((line) => {
  const [number1, number2] = line.split("  ");
  list[0]!.push(parseInt(number1!?.trim(), 10));
  list[1]!.push(parseInt(number2!?.trim(), 10));
});

function sort(list: number[]) {
  let i = 0;

  while (i < list.length - 1) {
    if (list[1] > list[i + 1]) {
      const temp = list[i];
      list[i] = list[i + 1];
      list[i + 1] = temp;
      i = 0;
    } else {
      i++;
    }
  }

  return list;
}

const list1 = sort(list[0]!);
const list2 = sort(list[1]!);

let differenceTotal = 0;

for (let i = 0; i < list1!.length; i++) {
  const diff = Math.abs(list1[i] - list2![i]);

  differenceTotal += diff;
}

console.log(differenceTotal);
