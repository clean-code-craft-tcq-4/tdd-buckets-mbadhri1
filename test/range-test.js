const {expect} = require('chai');
const {findRanges, sort} = require('../range-finder');

it('should sort the values', () => {
  const input = [4, 2, 3, 1];
  expect(sort(input)).to.deep.equal([1, 2, 3, 4]);
});

it(' for empty array', () => {
  const input = [];
  expect(findRanges(sort(input))).to.deep.equal([]);
});

it(' for  array with 1 element', () => {
  const input = [1];
  expect(findRanges(sort(input))).to.deep.equal([]);
});

it(' for  array with 2 consecutive element', () => {
  const input = [1, 2];
  expect(findRanges(sort(input))).to.deep.equal([
    {
      continousCount: 2,
      max: 2,
      min: 1,
    },
  ]);
});

it(' for  array with 2 same element', () => {
  const input = [2, 2];
  expect(findRanges(sort(input))).to.deep.equal([
    {
      continousCount: 2,
      max: 2,
      min: 2,
    },
  ]);
});

it(' for  array with n same element', () => {
  const input = [2, 2, 2, 2];
  expect(findRanges(sort(input))).to.deep.equal([
    {
      continousCount: 4,
      max: 2,
      min: 2,
    },
  ]);
});

it(' for  array with n different non continous element', () => {
  const input = [1, 3, 5, 7];
  expect(findRanges(sort(input)), input).to.deep.equal([]);
});

it(' for  array with n different continous and non continous element', () => {
  const input = [3, 3, 5, 4, 10, 11, 12];
  expect(findRanges(sort(input))).to.deep.equal([
    {
      continousCount: 4,
      max: 5,
      min: 3,
    },
    {
      continousCount: 3,
      max: 12,
      min: 10,
    },
  ]);
});
