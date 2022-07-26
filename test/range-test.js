const {expect} = require('chai');
const {findRanges, sort, atodbitconverter, bitConverter} = require('../range-finder');

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
  const input = [3, 3, 5, 4, 11, 9, 10, 13, 7, 17, 1, -1, -3];
  expect(findRanges(sort(input))).to.deep.equal([
    {
      continousCount: 4,
      max: 5,
      min: 3,
    },
    {
      continousCount: 3,
      max: 11,
      min: 9,
    },
  ]);
});

it('should convert 12 bit sensor empty array value ', () => {
  const input = [];
  expect(atodbitconverter(input)).to.deep.equal([]);
});

it('should convert bit to value ', () => {
  expect(bitConverter(12)).to.deep.equal(4096);
});

it('should convert 10 bit sensor array value ', () => {
  const input = [0, 1024, 512];
  expect(atodbitconverter(input)).to.deep.equal([-15, 15, 0]);
});

it('should convert 12 bit sensor array value ', () => {
  const input = [0, 1024, 512, 1146];
  expect(atodbitconverter(input, 12, 0, 10)).to.deep.equal([0, 3, 1, 3]);
});

it('should convert 12 bit sensor array value ', () => {
  const input = [0, 1024, 512, 1146, 1500];
  expect(findRanges(sort(atodbitconverter(input, 12, 0, 10)))).to.deep.equal([
    {
      continousCount: 2,
      max: 1,
      min: 0,
    },
    {
      continousCount: 3,
      max: 4,
      min: 3,
    },
  ]);
});
