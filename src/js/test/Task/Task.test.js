import {Task} from "../../Task/factory.js";

test("'Task' factory works.", () => {

  expect(Task('test').get()).toBe('test');

});


describe('Task Applicative (ap function)', () => {
    // test('should apply a function inside a Task to a value inside another Task', (done) => {
    //     const add1 = Task.unit((x) => x + 1); // Task containing a function
    //     const number = Task.unit((rej, res) => res(2)); // Task containing a value

    //     add1.ap(number).fork(
    //         (err) => done(err), // Fail the test if it rejects
    //         (result) => {
    //             expect(result).toBe(3); // Expect 2 + 1 = 3
    //             done();
    //         }
    //     );
    // });

    // test('should work with curried functions and multiple ap calls', (done) => {
    //     const add = Task.unit((x) => (y) => x + y); // Curried function in a Task
    //     const two = Task.unit((rej, res) => res(2));
    //     const three = Task.unit((rej, res) => res(3));

    //     add.ap(two).ap(three).fork(
    //         (err) => done(err),
    //         (result) => {
    //             expect(result).toBe(5); // Expect 2 + 3 = 5
    //             done();
    //         }
    //     );
    // });

    // test('should propagate errors if a Task rejects', (done) => {
    //     const failingTask = Task.unit((rej, res) => rej('Error occurred'));
    //     const add1 = Task.unit((x) => x + 1);

    //     add1.ap(failingTask).fork(
    //         (err) => {
    //             expect(err).toBe('Error occurred'); // Expect rejection to propagate
    //             done();
    //         },
    //         () => done('Test should not resolve')
    //     );
    // });
});
