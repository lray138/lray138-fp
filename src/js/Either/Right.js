import Gonad from '../Gonad.js';
import Either from './Either.js';

export default class Right extends Either {

	map(f) {
		return Right.unit(f(this.extract()));
	}

	bind(f) {
		return f(this.extract());
	}

	ap(v) {
  		return v.map(this.extract());
	}

	fork(_, r) {
  		return r(this.extract());
  	}

  	extend(f) {
  		return f(this);
  	}

	static unit(val) {
		return new Right(val);
	}

	extract() {
		return this.value;
	}

	constructor(value) {
    	super();
    	this.value = value;
  	}

}