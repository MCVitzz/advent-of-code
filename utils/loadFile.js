const fs = require("fs");

const loadFile = (path) => {
  const data = fs.readFileSync(path, "utf8").replace(/\r/g, "");
  return data;
};

module.exports = { loadFile };
