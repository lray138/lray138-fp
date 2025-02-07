// so, this would be a "SuperMonad" or whatever.
// I want an object that obeys this interface.
// I guess we could use tryCatch 
// there was a thought of why not put everythign in a try catch?

import Gonad from '../Gonad.js';
import { proxyWrap } from '../helpers.js';

export default class Num extends Gonad {

	static of(value) {
		return new Num(value);
	}

	add(x) {
		return this.map(v => v + x);
	}

	sub(x) {
		return this.map(v => v - x);
	}

	mul(x) {
		return this.map(v => v * x);
	}

	div(x) {
		return this.map(v => v / x);
	}

	map(f) {
		return proxWrap(new Num(f(this.extract())));
	}

	extract() {
		return this.value;
	}

	constructor(value) {
		super();
		this.value = value;
	}

}