const { loadFile } = require("./utils/loadFile");
const { isBetween } = require("./utils/isBetween");

const assignments = loadFile("input4.txt");

const getRange = (str) => {
  return str.split("-").map((s) => Number(s));
};

const fullyIncludes = (range1, range2) => {
  return range1[0] <= range2[0] && range1[1] >= range2[1];
};

const includes = (range1, range2) => {
  return (
    isBetween(range2[0], range1[0], range1[1]) ||
    isBetween(range2[1], range1[0], range1[1])
  );
};

const inclusivePairSoft = (pair) => {
  return includes(pair[0], pair[1]) || includes(pair[1], pair[0]);
};

const inclusivePair = (pair) => {
  return fullyIncludes(pair[0], pair[1]) || fullyIncludes(pair[1], pair[0]);
};

const inspectAssigments = (assignments) => {
  const pairs = assignments
    .split("\n")
    .map((pair) => pair.split(",").map(getRange));
  const inclusivePairs = pairs.map(inclusivePair);
  return inclusivePairs.filter((a) => a).length;
};

const carefulyInspectAssignments = (assignments) => {
  const pairs = assignments
    .split("\n")
    .map((pair) => pair.split(",").map(getRange));
  const inclusivePairs = pairs.map(inclusivePairSoft);
  return inclusivePairs.filter((a) => a).length;
};

console.log(inspectAssigments(assignments));

console.log(carefulyInspectAssignments(assignments));
