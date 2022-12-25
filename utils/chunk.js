const chunkArray = (array, chunkSize) => {
  const chunked = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    chunked.push(chunk);
  }
  return chunked;
};

module.exports = { chunkArray };
