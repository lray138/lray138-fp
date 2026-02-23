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
