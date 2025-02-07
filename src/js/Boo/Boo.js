// so, this would be a "SuperMonad" or whatever.
// I want an object that obeys this interface.
// I guess we could use tryCatch 
// there was a thought of why not put everythign in a try catch?

import Gonad from '../Gonad.js';
import { proxyWrap } from '../helpers.js';

export default class Boo extends Gonad {

	map(f) {
		return proxyWrap(new Boo(f(this.extract())));
	}

	bind(f) {
		return f(this.extract());
	}

	extend(f) {
		return f(this);
	}

	extract() {
		return this.value;
	}

	not() {
		return proxyWrap(new Boo(!this.extract()));
	}

	fork(onFalse, onTrue) {
		let val = this.extract();
		return val ? onTrue(val) : onFalse(val);
	}

	isTrue() {
		return this.extract() === true;
	}

	isFalse() {
		return !this.isTrue();
	}

	dump() {
		console.log(this.extract());
		return proxyWrap(this);
	}

	constructor(value) {
		super();
		if(value == null) value = false;
		this.value = value;
	}

}