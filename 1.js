const { loadFile } = require("./utils/loadFile");

const calorieList = loadFile("input1.txt");

const calcCalories = (calories) => {
  return calories
    .split("\n\n")
    .map((i) =>
      i.split("\n").reduce((prev, current) => Number(prev) + Number(current), 0)
    )
    .reduce((prev, current) => Math.max(prev, current), -Infinity);
};

const calcTopThree = (calories) => {
  return calories
    .split("\n\n")
    .map((i) =>
      i.split("\n").reduce((prev, current) => Number(prev) + Number(current), 0)
    )
    .sort((a, b) => b - a)
    .slice(0, 3);
};

const maxCalories = calcCalories(calorieList);

const topThree = calcTopThree(calorieList);

console.log("Max are :", maxCalories);
console.log(
  "Top Three are :",
  topThree,
  "Which total to:",
  topThree.reduce((prev, current) => prev + current, 0)
);
