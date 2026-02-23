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

    prop(p) {
        return this;
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

	tap(f) {
		return this;
	}

	extend(f) {
		return this;
	}

	eq(v) {
		return false;
	}

	constructor(value) {
    	super();
    	this.value = value;
  	}

}