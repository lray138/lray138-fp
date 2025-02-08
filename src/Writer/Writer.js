import Gonad from '../Gonad.js';

export default class Writer extends Gonad {
  constructor(value, log = []) {
    super();
    this.value = value;
    this.log = Array.isArray(log) ? log : [log];
  }

  static unit(value, log) {
    return new Writer(value, log);
  }

  static of(value, log) {
  	return this.unit(value, log);
  }

  static pure(value, log) {
  	return this.unit(value, log);
  }

  map(f) {
    return new Writer(f(this.value), this.log);
  }

  bind(f) {
  	const next = f(this.value);
    return new Writer(next.value, [...this.log, ...next.log]);
  }

  tell(log) {
    return new Writer(this.value, [...this.log, log]);
  }

  extract() {
    return {
    	value: this.value,
    	log: this.log
    };
  }

  extend(f) {
    return f(this);
  }

  fork(_, f) {
    return f(this.extract());
  }

  dump() {
  	console.log(this.extract());
  	return this;
  }

}