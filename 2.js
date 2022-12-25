const { loadFile } = require("./utils/loadFile");

const playList = loadFile("input2.txt");

const rockPaperScissors = (hand1, hand2) => {
  let winningHand = 2;

  if (hand1 === hand2) return winningHand;

  if (Math.abs(hand1) === Math.abs(hand2)) {
    winningHand = Math.max(hand1, hand2);
  } else {
    winningHand = Math.min(hand1, hand2);
  }

  if (winningHand === hand1) {
    return -1;
  } else {
    return 1;
  }
};

const formatInput = (input) => {
  const inputMap = new Map([
    ["X", 0], //Rock
    ["A", 0], //Rock
    ["B", -1], //Paper
    ["Y", -1], //Paper
    ["C", 1], //Scissors
    ["Z", 1], //Scissors
  ]);
  return inputMap.get(input);
};

const calculateResultPoints = (winningHand) => {
  const resultMap = new Map([
    [-1, 0],
    [1, 6],
    [2, 3],
  ]);

  return resultMap.get(winningHand);
};

const calculatePlayPoints = (play) => {
  const playMap = new Map([
    ["X", 1],
    ["Y", 2],
    ["Z", 3],
  ]);
  return playMap.get(play);
};

const getPlayForOutcome = (hand1, expectedOutcome) => {
  const losingMap = new Map([
    ["A", "Z"],
    ["B", "X"],
    ["C", "Y"],
  ]);
  const drawMap = new Map([
    ["A", "X"],
    ["B", "Y"],
    ["C", "Z"],
  ]);
  const winningMap = new Map([
    ["A", "Y"],
    ["B", "Z"],
    ["C", "X"],
  ]);
  const playMap = new Map([
    ["X", losingMap],
    ["Y", drawMap],
    ["Z", winningMap],
  ]);
  return playMap.get(expectedOutcome).get(hand1);
};

const playRound1 = (round) => {
  const hands = round.split(" ");
  const handsFormatted = hands.map(formatInput);
  const winningHand = rockPaperScissors(handsFormatted[0], handsFormatted[1]);
  const roundPoints =
    calculateResultPoints(winningHand) + calculatePlayPoints(hands[1]);
  //   console.log(winningHand, calculateResultPoints(winningHand));

  return roundPoints;
};

const playRound2 = (round) => {
  const [enemyHand, expectedOutcome] = round.split(" ");
  const formattedEnemyHand = formatInput(enemyHand);
  const myHand = getPlayForOutcome(enemyHand, expectedOutcome);
  const formattedMyHand = formatInput(myHand);
  const winningHand = rockPaperScissors(formattedEnemyHand, formattedMyHand);
  const roundPoints =
    calculateResultPoints(winningHand) + calculatePlayPoints(myHand);
  return roundPoints;
};

const tournament = (playlist, readingStyle) => {
  const plays = playlist.split("\n");
  const result = plays
    .map(readingStyle === "1" ? playRound1 : playRound2)
    .reduce((prev, current) => prev + current, 0);
  return result;
};

console.log(tournament(playList, "2"));
