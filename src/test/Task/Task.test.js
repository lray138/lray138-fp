import {Task} from "../../Task/factory.js";

test("'Task' resolves plain values through fork.", (done) => {
  Task('test').fork(
    err => done(err),
    value => {
      expect(value).toBe('test');
      done();
    }
  );
});

test("'Task' supports promise thunks lazily.", (done) => {
  const computation = jest.fn(() => Promise.resolve(42));
  const task = Task(computation);

  expect(computation).toHaveBeenCalledTimes(0);

  task.fork(
    err => done(err),
    value => {
      expect(value).toBe(42);
      expect(computation).toHaveBeenCalledTimes(1);
      done();
    }
  );
});

describe('Task Applicative (ap function)', () => {
    test('should apply a function inside a Task to a value inside another Task', (done) => {
        const add1 = Task.unit((x) => x + 1);
        const number = Task.unit(2);

        add1.ap(number).fork(
            (err) => done(err),
            (result) => {
                expect(result).toBe(3);
                done();
            }
        );
    });

    test('should work with curried functions and multiple ap calls', (done) => {
        const add = Task.unit((x) => (y) => x + y);
        const two = Task.unit(2);
        const three = Task.unit(3);

        add.ap(two).ap(three).fork(
            (err) => done(err),
            (result) => {
                expect(result).toBe(5);
                done();
            }
        );
    });

    test('should propagate errors if a Task rejects', (done) => {
        const failingTask = Task((rej, _res) => rej('Error occurred'));
        const add1 = Task.unit((x) => x + 1);

        add1.ap(failingTask).fork(
            (err) => {
                expect(err).toBe('Error occurred');
                done();
            },
            () => done('Test should not resolve')
        );
    });
});
