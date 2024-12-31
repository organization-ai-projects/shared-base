import { logMessage } from './logger';

test('logMessage logs the correct message', () => {
  console.log = jest.fn();
  logMessage('Test message');
  expect(console.log).toHaveBeenCalledWith('[LOG]: Test message');
});
