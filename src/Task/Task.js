import Gonad from '../Gonad.js';
import { proxy } from '../helpers.js';

export default class Task extends Gonad {
    constructor(computation) {
        super();
        this.computation = computation;
    }

    static unit(computation) {
        return new Task(computation);  // Wraps value in a Task
    }

    map(f) {
        return new Task((rej, res) => {
            this.extract()(rej, (x) => res(f(x)));  // Log to check map
        });
    }

    bind(f) {
        return new Task((rej, res) => {
            this.extract()(rej, (x) => f(x).fork(rej, res));  // Log to check bind
        });
    }

    extract(f) {
        return this.computation;
    }

    fork(reject, resolve) {
        return this.extract()(reject, resolve);  // Check if the computation is called
    }

    ap(taskWithValue) {
        return new Task((rej, res) => {
            this.fork(rej, (fn) => { // Extract function from the first Task
                taskWithValue.fork(rej, (value) => { // Extract value from the second Task
                    res(fn(value)); // Apply function to value
                });
            });
        });
    }

}