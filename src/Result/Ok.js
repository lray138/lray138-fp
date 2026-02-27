import Result from './Result.js';

export default class Ok extends Result {

	map(f) {
		return Ok.unit(f(this.extract()));
	}

	bind(f) {
		return f(this.extract());
	}

	ap(v) {
		return v.map(this.extract());
	}

    orElse(_) {
        return this;
    }

	fork(_, r) {
		return r(this.extract());
	}

	tap(f) {
		f(this.extract());
		return this;
	}

	extend(f) {
		return f(this);
	}

	static unit(val) {
		return new Ok(val);
	}

	constructor(value) {
		super();
		this.value = value;
	}

}
