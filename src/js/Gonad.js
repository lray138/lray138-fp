// so, this would be a "SuperMonad" or whatever.
// I want an object that obeys this interface.
// I guess we could use tryCatch 
// there was a thought of why not put everythign in a try catch?


export default class Gonad {
  constructor() {
    if (new.target === Gonad) {
      throw new Error("Gonad is an abstract class and cannot be instantiated directly.");
    }
  }

  map(f) {
    throw new Error("'map' function must be implemented by subtype");
  }

  bind(f) {
    throw new Error("'bind' must be implemented by subtype.");
  }

  chain(f) {
    return this.bind(f);
  }

  flatMap(f) {
    return this.bind(f);
  }

  extract() {
    throw new Error("'extract' must be implemented by subtype.");
  }

  join() {
    return this.extract();
  }

  get() {
    return this.extract();
  }

  getOrElse(x) {
    let v = this.extract();
    return v == null ? x : v;
  }

  fork(l, r) {
    throw new Error("'fork' function must be implemented by subtype");
  }

  bimap(l, r) {
    return this.fork(l, r);
  }

  either(l, r) {
    return this.fork(l, r);
  }

  static unit(v) {
    throw new Error("unit must be implemented by subtype");
  }

  static of(v) {
    return this.unit(v);
  }

  static pure(v) {
    return this.unit(v);
  }

  extend(f) {
    throw new Error("'extend' must be implemented by subtype.");
  }

  ap(x) {
    throw new Error("'ap' must be implemented by subtype.");
  }

  // need this for testing due to Proxy
  type() {
    return this.constructor.name;
  }

}

