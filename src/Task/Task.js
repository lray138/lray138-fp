import Gonad from '../Gonad.js';

export default class Task extends Gonad {
    constructor(computation) {
        super();
        this.computation = this.normalize(computation);
    }

    normalize(computation) {
        if (typeof computation !== 'function') {
            return (_, res) => res(computation);
        }

        if (computation.length >= 2) {
            return computation;
        }

        return (rej, res) => {
            try {
                const out = computation();
                if (out && typeof out.then === 'function') {
                    out.then(res).catch(rej);
                } else {
                    res(out);
                }
            } catch (error) {
                rej(error);
            }
        };
    }

    static unit(value) {
        return new Task((_, res) => res(value));
    }

    map(f) {
        return new Task((rej, res) => {
            this.fork(rej, (x) => res(f(x)));
        });
    }

    bind(f) {
        return new Task((rej, res) => {
            this.fork(rej, (x) => f(x).fork(rej, res));
        });
    }

    extract() {
        return this.computation;
    }

    fork(reject, resolve) {
        return this.extract()(reject, resolve);
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