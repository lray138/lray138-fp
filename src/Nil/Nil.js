import Gonad from '../Gonad.js';
import { Nothing } from '../Maybe/factory.js';
import { Err } from '../Result/factory.js';

export default class Nil extends Gonad {

	map() {
		return this;
	}

	bind() {
		return this;
	}

	ap() {
		return this;
	}

	extend() {
		return this;
	}

	prop() {
		return this;
	}

	path() {
		return this;
	}

	call() {
		return this;
	}

	fork(f, _) {
		return f(this.reason());
	}

	reason() {
		return this.message;
	}

	isNil() {
		return true;
	}

	toMaybe() {
		return Nothing();
	}

	toResult() {
		return Err(this.reason());
	}

	extract() {
		return null;
	}

	toString() {
		return this.reason();
	}

	[Symbol.toPrimitive]() {
		return this.reason();
	}

	static unit(message) {
		return new Nil(message);
	}

	constructor(message) {
		super();
		this.message = message == null ? 'value is nil' : String(message);
	}
}
