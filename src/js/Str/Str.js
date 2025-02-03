// so, this would be a "SuperMonad" or whatever.
// I want an object that obeys this interface.
// I guess we could use tryCatch 
// there was a thought of why not put everythign in a try catch?

import Gonad from '../Gonad.js';

export default class Str extends Gonad {

	static of(value) {
		return new Str(value);
	}

	map(f) {
		return new Str(f(this.extract()));
	}

	bind(f) {
		return f(this.extract());
	}

	extract() {
		return this.value;
	}

	constructor(value) {
		super();
		this.value = value;
	}

}