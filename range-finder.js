function sort(array) {
	return array.sort(function (a, b) {
		return a - b;
	});
}

function findRanges(sortedInput) {
	let minContinous = 0;
	let maxContinous;
	let continousCount = 1;
	let ranges = [];
	sortedInput.forEach((element, index) => {
		const difference = sortedInput[index + 1] - sortedInput[index];
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

// function rangeFormatter(range) {
// 	console.log(`${range.min}-${range.max} ${range.continousCount}`);
// }

function rangeFormatter(ranges) {
	printHeader();
	ranges.forEach((range) => {
		console.log(`${range.min}-${range.max} ${range.continousCount}`);
	});
}

module.exports = {
	sort,
	findRanges,
};
// rangeFormatter(findRanges(sort([3, 3, 5, 7, 8, 9, 11, 12, 13])));
