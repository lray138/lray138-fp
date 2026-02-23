import Gonad from '../Gonad.js';
import { Str } from '../Str/factory.js';
import { Left } from '../Either/factory.js';
import { Ok, Err } from '../Result/factory.js';
import { wrapType, proxy } from '../helpers.js';

export default class Kvm extends Gonad {

	static unit(value) {
		return new this(value);
	}

	walk(f) {
		let x = this.extract();
		Object.entries(x).forEach(([key, value]) => f(value, key, x));
		return new Proxy(this, proxy);
	}

	map(f) {
		let x = this.extract();
		let o = Object.fromEntries(Object.entries(x).map(([k, v]) => [k, f(v)]));
		return new Proxy(new Kvm(o), proxy);
	}

	prop(p) {
		let value = this.extract();
		if (value && typeof value === 'object' && p in value) {
			return wrapType(value[p]);
		}
		return Left('prop "' + p + '" not found');
	}

	path(p) {
		if (typeof p !== 'string' || p.trim() === '') {
			return Left('path "' + p + '" not found');
		}

		const parts = p
			.trim()
			.split(/[/.]+/)
			.filter(part => part !== '')
			.flatMap(part => {
				const segments = [];
				const re = /([^[\]]+)|\[(\d+)\]/g;
				let match;
				while ((match = re.exec(part)) !== null) {
					segments.push(match[1] ?? match[2]);
				}
				return segments;
			});

		let current = this.extract();

		for (const part of parts) {
			if (current == null || !(part in current)) {
				return Left('path "' + p + '" not found');
			}
			current = current[part];
		}

		return wrapType(current);
	}

	tryPath(p) {
		const value = this.path(p);
		return value.type() === 'Left'
			? Err(value.extract())
			: Ok(value);
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
		let o = {};

		Object.entries(x).forEach(([key, value]) => {
			o[key] = f(value).extract();
		});

		return new Proxy(new Kvm(o), proxy);
	}

	extract() {
		return this.value;
	}

	join(d) {
		d = d == null ? '' : d;
		return Str(Object.values(this.extract()).join(d));
	}

	fork(_, f) {
	    return f(this.extract());
	}

	extend(f) {
		return f(this);
	}

	constructor(value) {
		super();

		if(value == null) {
			value = {};
		}

		if(Array.isArray(value)) {
			value = Object.fromEntries(value.map((v, i) => [i, v]));
		}

		if(typeof value !== "object") {
			value = { value };
		}

		this.value = value;
	}
}
