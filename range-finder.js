function sort(array) {
  return array.sort(function(a, b) {
    return a - b;
  });
}

function findRanges(sortedInput) {
  let minContinous = 0;
  let maxContinous;
  let continousCount = 1;
  const ranges = [];
  sortedInput.forEach((element, index) => {
    if (sortedInput[index + 1] && [0, 1].includes(sortedInput[index + 1] - sortedInput[index])) {
      maxContinous = index + 1;
      continousCount++;
    } else {
      if (continousCount > 1) {
        ranges.push({
          min: sortedInput[minContinous],
          max: sortedInput[maxContinous],
          continousCount,
        });
        maxContinous = undefined;
        continousCount = 1;
      }
      minContinous = index + 1;
    }
  });
  return ranges;
}
function printHeader() {
  console.log('Range, Readings');
}

function rangeFormatter(ranges) {
  printHeader();
  ranges.forEach((range) => {
    console.log(`${range.min}-${range.max}, ${range.continousCount}`);
  });
}

module.exports = {
  sort,
  findRanges,
  rangeFormatter,
};
rangeFormatter(findRanges(sort([3, 3, 5, 7, 8, 9, 11, 12, 13])));
