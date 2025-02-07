import { Future } from '../../Future/factory.js';  // Import your Future class

describe('Future', () => {

  it('should execute the computation immediately', async () => {
    const computation = jest.fn(() => Promise.resolve(42));
    const future = Future(computation);

    // Expect the computation to be called immediately
    expect(computation).toHaveBeenCalledTimes(1);

    // // Test that the future resolves as expected
    await expect(future.extract()).resolves.toBe(42);
  
  });

  it('should resolve with the correct value', async () => {
    const future = Future(() => Promise.resolve(100));

    // Test that the future resolves correctly
    await expect(future.extract()).resolves.toBe(100);
  });

  it('should reject with an error', async () => {
    const future = Future(() => Promise.reject('Something went wrong'));

    // Test that the future rejects correctly
    await expect(future.extract()).rejects.toBe('Something went wrong');
  });

  it('should map over the result', async () => {
    const future = Future(() => Promise.resolve(5));

    // Test the .map() method
    const mappedFuture = future.map(x => x * 2);
    await expect(mappedFuture.extract()).resolves.toBe(10);
  
  });

  it('should bind to another future', async () => {
    const future = Future(() => Promise.resolve(5));

    // Test the .bind() method
    const boundFuture = future.bind(x => Future(() => Promise.resolve(x + 5)));
    await expect(boundFuture.extract()).resolves.toBe(10);
  });

  it('should fork the future and call resolve', (done) => {
    const future = Future(() => Promise.resolve(42));

    // Test the .fork() method
    future.fork(
      (error) => done(error),  // Should not be called
      (data) => {
        try {
          expect(data).toBe(42);
          done();  // Success case
        } catch (error) {
          done(error);  // If the assertion fails, it will be passed to done() as an error
        }
      }
    );
  });

  it('should fork the future and call reject', (done) => {
    const future = Future(() => Promise.reject('Error occurred'));

    // Test the .fork() method for rejection
    future.fork(
      (error) => {
        try {
          expect(error).toBe('Error occurred');
          done();  // Success case
        } catch (error) {
          done(error);  // If the assertion fails, it will be passed to done() as an error
        }
      },
      (data) => done('Should not resolve')
    );
  });

});