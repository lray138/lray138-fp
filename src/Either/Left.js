import Gonad from '../Gonad.js';
import Either from './Either.js';

export default class Left extends Either {

	map() {
		return this;
	}

	bind() {
		return this;
	}

	getOrElse(v) {
		return v;
	}

	static unit(val) {
		return new Left(val);
	}

	extract() {
		return this.value;
	}

	fork(f, _) {
		return f(this.extract())
	}

	ap(f) {
		return this;
	}

	extend(f) {
		return this;
	}

	constructor(value) {
    	super();
    	this.value = value;
  	}

}