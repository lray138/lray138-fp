// so, this would be a "SuperMonad" or whatever.
// I want an object that obeys this interface.
// I guess we could use tryCatch 
// there was a thought of why not put everythign in a try catch?

import Gonad from '../Gonad.js';
import { Str } from '../Str/factory.js';
import { proxy } from '../helpers.js';

export default class Arr extends Gonad {

	static unit(value) {
		return new Arr(value);
	}

	walk(f) {
		let x = this.extract();

		if(Array.isArray(x)) {
			x.forEach((value, index) => f(value, index, x));
		} else {
			Object.entries(x).forEach(([key, value]) => f(value, key, x));
		}

		return new Proxy(this, proxy);
	}

	map(f) {

		let x = this.extract();

		let o = Array.isArray(x)
			? x.map(f)
			: Object.values(x).map(f);

		return new Proxy(new Arr(o), proxy);
	}

	ap(v) {
		return this.map(f => f(v.extract()));
	}

	bind(f) {

		let x = this.extract();
		let o;

		if(Array.isArray(x)) {
			o = [];
			x.forEach((value, key) => o[key] = f(value).join());
		} else {
			o = {};
			Object.entries(x).forEach(([key, value]) => {
				o[key] = f(value).extract();
			});
		}

		return new Proxy(new Arr(o), proxy);
	}

	extract() {
		return this.value;
	}

	join(d) {
		d = d == null ? '' : d;
		let v = this.extract();
		return Array.isArray(v) ? Str(v.join(d)) : Str(Object.values(v).join(d));
	}

	fork(_, f) {
	    return f(this.extract());
	}

	extend(f) {
		return f(this);
	}

	constructor(value) {
		super();

		if(typeof value == "undefined") {
			value = [];
		}

		if(typeof value != "object") {
			value = [value];
		}



		this.value = value;
	}

}
