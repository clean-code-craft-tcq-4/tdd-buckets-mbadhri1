const {expect} = require('chai');
const {atodbitconverter, bitConverter} = require('../atodConverter');
const {sort, findRanges} = require('../range-finder');

describe('shoud test atodconverter', () => {
  it('should convert 12 bit sensor empty array value ', () => {
    const input = [];
    expect(atodbitconverter(input)).to.deep.equal([]);
  });

  it('should convert bit to value ', () => {
    expect(bitConverter(12)).to.deep.equal(4096);
  });

  it('should convert 10 bit sensor array value ', () => {
    const input = [0, 1022, 512];
    expect(atodbitconverter(input, 0, bitConverter(10) - 1, -15, 15)).to.deep.equal([-15, 15, 0]);
  });

  it('should convert 12 bit sensor array value ', () => {
    const input = [0, 1024, 512, 1146];
    expect(atodbitconverter(input, 0, bitConverter(12)-2, 0, 10)).to.deep.equal([0, 3, 1, 3]);
  });

  it('should throw error for 12 bit converter ', () => {
    const input = [0, 4095];
    expect(() => atodbitconverter(input, 0, bitConverter(12)-2, 0, 10)).to.throw(
        'input out of sensor range',
    );
  });

  it('should throw error for 10 bit converter ', () => {
    const input = [0, 1024];
    expect(() => atodbitconverter(input, 0, bitConverter(10) - 1, -15, 15)).to.throw(
        'input out of sensor range',
    );
  });

  it('should convert 12 bit sensor array value to continous range', () => {
    const input = [0, 1024, 512, 1146, 1500];
    expect(findRanges(sort(atodbitconverter(input, 0, bitConverter(12)-2, 0, 10)))).to.deep.equal([
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
});
