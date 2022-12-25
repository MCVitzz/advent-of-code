const { chunkArray } = require("./utils/chunk");
const { loadFile } = require("./utils/loadFile");

const rucksacks = loadFile("input3.txt");

const calcPriority = (letter) => {
  let modifier = 96;
  if (letter === letter.toUpperCase()) modifier = 64 - 26;
  return letter.charCodeAt(0) - modifier;
};

const splitRucksack = (contents) => {
  const index = Math.ceil(contents.length / 2);

  const result = [contents.slice(0, index), contents.slice(index)];

  return result;
};

const findCommon = ([compartment1, compartment2]) => {
  return Array.from(
    new Set(compartment1.split("").filter((l) => compartment2.includes(l)))
  );
};

const countItems = (rucksacks) => {
  return rucksacks
    .split("\n")
    .map(splitRucksack)
    .map(findCommon)
    .map((l) =>
      l.map(calcPriority).reduce((prev, current) => prev + current, 0)
    )
    .reduce((prev, current) => prev + current, 0);
};

const findBadge = (group) => {
  let res = [...group[0]];
  for (let i = 1; i < group.length; i++) {
    res = res.filter((c) => {
      const l = group[i].length;
      group[i] = group[i].replace(c, "");
      return l > group[i].length;
    });
  }
  return res[0];
};

const getBadges = (rucksacks) => {
  const rucksackArray = rucksacks.split("\n");
  const groups = chunkArray(rucksackArray, 3);
  const badges = groups.map(findBadge);
  const priorities = badges.map(calcPriority);
  const sumPriorities = priorities.reduce((prev, current) => prev + current, 0);
  return sumPriorities;
};

console.log(countItems(rucksacks));

console.log(getBadges(rucksacks));
