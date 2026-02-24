import Gonad from '../Gonad.js';
import { Str } from '../Str/factory.js';
import { Left } from '../Either/factory.js';
import { wrapType } from '../helpers.js';

export default class Lst extends Gonad {

	static unit(value) {
		return new this(value);
	}

	head() {
		const [first] = this.extract();
		return first !== undefined ? wrapType(first) : Left('array contains no elements');
	}

	walk(f) {
		let x = this.extract();
		x.forEach((value, index) => f(value, index, x));
		return this;
	}

	map(f) {
		let x = this.extract();
		let o = x.map(f);
		return new Lst(o);
	}

	prop(p) {
		let value = this.extract();
		if (value && (typeof value === 'object' || Array.isArray(value)) && p in value) {
			return wrapType(value[p]);
		}
		return Left('prop "' + p + '" not found');
	}

	call(f, ...args) {
		return this.prop(f)
			.bind(c => {
				if(typeof c === "function") {
					return Array.isArray(args[0])
						? wrapType(c(...args[0]))
						: wrapType(c(...args));
				}
				return Left('prop "' + f + '" is not callable');
			});
	}

	ap(v) {
		return this.map(f => f(v.extract()));
	}

	bind(f) {
		let x = this.extract();
		let o = [];
		x.forEach((value, key) => o[key] = f(value).join());
		return new Lst(o);
	}

	extract() {
		return this.value;
	}

	join(d) {
		d = d == null ? '' : d;
		let v = this.extract();
		return Str(v.join(d));
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

		if(typeof value != "object" || !Array.isArray(value)) {
			value = [value];
		}

		this.value = value;
	}
}
