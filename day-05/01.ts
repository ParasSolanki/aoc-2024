import { readFile } from "fs/promises";

const input = await readFile(new URL("./input.txt", import.meta.url), {
  encoding: "utf-8",
});

const [rules, all] = input.trimEnd().split("\r\n\r\n");

const pages = rules?.split("\r\n").map((row) => row.trimEnd().split("|"));
const updates = all?.split("\r\n").map((row) =>
  row
    .trimEnd()
    .split("\r\n")
    .flatMap((u) => u.trimEnd().split(","))
);

function isValidUpdate(update: string[]) {
  for (let i = 0; i < update.length; i++) {
    const number = update[i];
    const rest = update.slice(0, i);

    const filtered = pages?.filter((page) => page[0] === number);

    const isOrderRuleNotCorrect = filtered?.some((page) =>
      rest.includes(page[1])
    );

    if (isOrderRuleNotCorrect) {
      return false;
    }
  }

  return true;
}

let total = 0;

for (let i = 0; i < updates!.length; i++) {
  const update = updates![i];

  if (isValidUpdate(update!)) {
    const middleIndex = Math.floor(update!?.length / 2);
    total += parseInt(update![middleIndex]!);
  }
}

console.log(total);
