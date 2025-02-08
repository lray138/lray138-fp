import Gonad from '../Gonad.js';
import { proxy } from '../helpers.js';

export default class Future extends Gonad {
    constructor(computation) {
        super();
        // Start computation immediately upon creation
        this.computation = computation();
    }

    // Static unit method to wrap a value
    static unit(value) {
        return new Future(() => Promise.resolve(value));
    }

    // Apply a function to the value in the future
    map(f) {
        return new Future(() => {
            return this.computation.then(f);  // Apply map to resolved value
        });
    }

    // Bind to another future (chain)
    bind(f) {
        return new Future(() => {
            return this.computation.then(x => f(x).computation); // Chain to another Future
        });
    }

    // Extract the underlying computation
    extract() {
        return this.computation;
    }

    // Fork to resolve/reject the future
    fork(reject, resolve) {
        this.extract().then(resolve).catch(reject);
    }

    // Apply one future's result to another's function
    ap(futureWithValue) {
        return new Future(() => {
            return this.computation.then(fn => {
                return futureWithValue.computation.then(value => {
                    return fn(value);  // Apply the function from this Future to the value from the other Future
                });
            });
        });
    }

    // Sleep method to delay the computation for a given amount of time
    sleep(ms) {
        return this.map((x) => new Promise(resolve => setTimeout(() => resolve(x), ms)))
    }

    dump() {
        this.computation.then(result => {
            console.log(result);
        });
        return this; // Return the current Future to keep the chain
    }
}