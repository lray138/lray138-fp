import Gonad from '../Gonad.js';

export default class Reader extends Gonad {
  constructor(action) {
    super();
    this.action = action; // Function: (env) => value
  }

  static unit(action) {
    return new Reader(action);
  }

  static of(action) {
    return this.unit(value);
  }

  static pure(action) {
    return this.unit(value);
  }

  map(f) {
    return new Reader(env => f(this.run(env)));
  }

  bind(f) {
    return new Reader(env => f(this.run(env)).run(env));
  }

  ask() {
    return new Reader(env => env);
  }

  local(f) {
    return new Reader(env => this.run(f(env)));
  }

  run(env) {
    return this.action(env);
  }

  extend(f) {
  		return f(this);
  }

  dump(env) {
    console.log(this.run(env));
    return this;
  }

}