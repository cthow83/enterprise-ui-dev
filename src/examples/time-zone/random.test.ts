import { random } from './random';

describe('random', () => {
  it('should return a random number', () => {
    const result = random();
    expect(result).toBeGreaterThanOrEqual(-2);
    expect(result).toBeLessThanOrEqual(2);
  });
});
