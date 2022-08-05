function atodbitconverter(input, sensorMinReading, sensorMaxReading, minAmp = -15, maxAmp = 15) {
  if (outOfRangeInput(input, sensorMinReading, sensorMaxReading)) {
    const errorMessage = {code: 403, message: 'input out of sensor range'};
    throw errorMessage;
  }
  return input.map((value) =>
    Math.round(
        ((value - sensorMinReading) * (maxAmp - minAmp)) / (sensorMaxReading - sensorMinReading) +
            minAmp,
    ),
  );
}

function outOfRangeInput(input, sensorMinReading, sensorMaxReading) {
  return input.some((value) => value<sensorMinReading || value > sensorMaxReading);
}

function bitConverter(bit) {
  return Math.pow(2, bit);
}

module.exports = {
  atodbitconverter,
  bitConverter,
};
