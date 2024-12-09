import { readFile } from "fs/promises";

const input = await readFile(new URL("./example.txt", import.meta.url), {
  encoding: "utf-8",
});

const lines = input
  .trimEnd()
  .split("\n")
  .map((line) =>
    line
      .trim()
      .split(":")
      .map((x) => x.trim())
  )
  .reduce((acc, curr) => {
    const [key, value] = curr;
    if (key && value) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, string>);

type Operator = "+" | "*" | "||";

const operators = ["+", "*", "||"] as [Operator, Operator, Operator];
function generateOpCombinations(
  length: number,
  operators: Operator[]
): Operator[][] {
  const uniqueCombinations = new Set<string>();

  function helper(current: Operator[]): Operator[][] {
    if (current.length === length) {
      const key = current.join(","); // Create a unique key for the combination
      if (!uniqueCombinations.has(key)) {
        uniqueCombinations.add(key);
        return [current];
      }
      return [];
    }

    return operators.flatMap((op) => helper([...current, op]));
  }

  return helper([]);
}

function evaluateExpression(numbers: number[], ops: Operator[]): number {
  let result = numbers[0]!;
  for (let i = 0; i < ops.length; i++) {
    if (ops[i] === "+") {
      result += numbers[i + 1]!;
    } else if (ops[i] === "*") {
      result *= numbers[i + 1]!;
    } else if (ops[i] === "||") {
      result = parseInt(`${result}${numbers[i + 1]}`, 10);
    }
  }
  return result;
}

function run(lines: Record<string, string>) {
  let total = 0;

  for (const [key, value] of Object.entries(lines)) {
    const keyInNumber = parseInt(key, 10);
    const values = value.split(" ").map((x) => parseInt(x, 10));

    const operatorCombinations = generateOpCombinations(
      values.length - 1,
      operators
    );

    for (const ops of operatorCombinations) {
      const result = evaluateExpression(values, ops);
      if (keyInNumber === result) {
        total += result;
        break;
      }
    }
  }
  console.log(total);
}

run(lines);
