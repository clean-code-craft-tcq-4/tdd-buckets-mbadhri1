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
    const difference = findDifference(
        sortedInput[index + 1],
        sortedInput[index],
    );
    if ([0, 1].includes(difference)) {
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

function findDifference(number1, number2) {
  if (number1 !== undefined || number2 != undefined) {
    return number1-number2;
  }
}

module.exports = {
  sort,
  findRanges,
  rangeFormatter,
};
rangeFormatter(findRanges(sort([3, 3, 5, 7, 8, 9, 11, 12, 13])));
