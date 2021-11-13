/**
 * @jest-environment jsdom
 */
const functions = require('../testing/Lab5_Starter\ copy/assets/scripts/expose.js');

test('print test 1', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  functions.printToConsole('test 1');
  expect(consoleSpy).toHaveBeenCalledWith('test 1');
});

test('print test 2', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  functions.printToConsole('test 2');
  expect(consoleSpy).toHaveBeenCalledWith('test 2');
});
