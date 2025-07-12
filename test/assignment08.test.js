const { randomIntFromInterval, createNumberPool } = require('../src/assignment_08');

describe("Seller's permit automation", () => {
  test('randomIntFromInterval generates number within range', () => {
    const min = 1;
    const max = 49;
    const result = randomIntFromInterval(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });

  test('createNumberPool generates correct pool', () => {
    const size = 49;
    const pool = createNumberPool(size);
    expect(pool.length).toBe(size);
    expect(pool[0]).toBe(1);
    expect(pool[48]).toBe(49);
    expect(pool).toEqual(expect.arrayContaining([1, 25, 49]));
  });
});
