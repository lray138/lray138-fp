import Result from './Result.js';

export default class Err extends Result {

	map() {
		return this;
	}

	bind() {
		return this;
	}

	getOrElse(v) {
		return v;
	}
    
    orElse(f) {
        // f should return a Result (Ok or Err)
        return f(this.extract());
    }

	fork(f, _) {
		return f(this.extract());
	}

	ap() {
		return this;
	}

	tap() {
		return this;
	}

	extend() {
		return this;
	}

	static unit(val) {
		return new Err(val);
	}

	constructor(value) {
		super();
		this.value = value;
	}

}
