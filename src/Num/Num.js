// so, this would be a "SuperMonad" or whatever.
// I want an object that obeys this interface.
// I guess we could use tryCatch 
// there was a thought of why not put everythign in a try catch?

import Gonad from '../Gonad.js';
import { Boo } from '../Boo/factory.js';
import { proxyWrap } from '../helpers.js';

export default class Num extends Gonad {

	static unit(value) {
		return new Num(Number(value));
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

	eq(v) {
		return this.bind(x => Boo(x === v));
	}

	map(f) {
		return proxyWrap(new Num(f(this.extract())));
	}

	bind(f) {
		return this.map(f).join();
	}

	extract() {
		return this.value;
	}

	constructor(value) {
		super();
		this.value = value;
	}

}