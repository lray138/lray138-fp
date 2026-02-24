// so, this would be a "SuperMonad" or whatever.
// I want an object that obeys this interface.
// I guess we could use tryCatch 
// there was a thought of why not put everythign in a try catch?

import Gonad from '../Gonad.js';
import { Left } from '../Either/factory.js';
import { Boo } from '../Boo/factory.js';
import { proxyWrap } from '../helpers.js';

export default class Str extends Gonad {

	charAt(x) {
		let char = this.extract().charAt(x);
		return char == false
			? Left('no character found at index ' + x)
			: proxyWrap(Str.unit(char));
	}

	append(x) {
		return proxyWrap(new Str(this.extract() + x));
	}

	prepend(x) {
		return proxyWrap(new Str(x + this.extract()));
	}

	static unit(value) {
		return new Str(String(value));
	}

	map(f) {
		return proxyWrap(new Str(f(this.extract())));
	}

	bind(f) {
		return this.map(f).join();
	}

	extract() {
		return this.value;
	}

	eq(v) {
		return this.bind(x => Boo(x === v));
	}

	toString() {
		return this.extract();
	}

	[Symbol.toPrimitive]() {
		return this.extract();
	}

	constructor(value) {
		super();
		this.value = value;
	}

	dump() {
    	console.log(this.extract());
    	return proxyWrap(this);
  	}

}