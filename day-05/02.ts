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

function reorderInvalidPages(update: string[]) {
  const set = {} as Record<string, string[]>;
  const filtered = pages!?.filter(
    (page) => update.includes(page[0]!) && update.includes(page[1]!)
  );

  for (let i = 0; i < update.length; i++) {
    const number = update[i];

    if (!number) continue;

    const numberFiltered = filtered
      ?.filter((p) => p.includes(number))
      .filter((p) => p[0] !== number)
      .map((p) => p[0]);

    set[number] = numberFiltered as string[];
  }

  const correctOrderUpdate = Array.from({ length: update.length }) as string[];
  for (const [key, value] of Object.entries(set)) {
    correctOrderUpdate[value.length] = key;
  }

  const isSame = update.every((u, index) => u === correctOrderUpdate[index]);
  return { isSame, correctOrderUpdate };
}

console.log(
  updates?.reduce((total, update) => {
    const { isSame, correctOrderUpdate } = reorderInvalidPages(update);

    if (!isSame) {
      total += parseInt(
        correctOrderUpdate[Math.floor(correctOrderUpdate.length / 2)]!,
        10
      );
    }
    return total;
  }, 0)
);
