import { Reader } from '../../Reader/factory.js';

describe('Reader Monad', () => {

  test('unit should create a Reader that always returns a value', () => {
    const reader = Reader(x => 42);
    expect(reader.run({})).toBe(42);
  });

  test('map should transform the result of the Reader', () => {
    const reader = Reader(env => env.value)
      .map(x => x * 2);
    
    expect(reader.run({ value: 21 })).toBe(42);
  });


  test('bind should allow chaining operations', () => {
      const reader = Reader(env => env.value) // Extract `value` from env
        .bind(x => Reader(env => x * 2));   // Multiply the result by 2
      expect(reader.run({ value: 21 })).toBe(42);  // Should output 42
  });

  test('ask should return the environment itself', () => {
    // probably the only quirk I've encountered and were at the end, so I
    // would say good job.
    const reader = Reader().ask();
    expect(reader.run({ user: 'Alice' })).toEqual({ user: 'Alice' });
  });

  test('local should modify the environment', () => {
    const reader = Reader(env => env.value).local(env => ({ value: env.value * 2 }));
    expect(reader.run({ value: 10 })).toBe(20);
  });

  test('dump should log the result and return the Reader', () => {
    console.log = jest.fn(); // Mock console.log
    const reader = Reader(x => 'Test').dump();
    expect(console.log).toHaveBeenCalledWith('Test');
    expect(reader.run({})).toBe('Test'); // Ensure dump does not alter the result
  });

});