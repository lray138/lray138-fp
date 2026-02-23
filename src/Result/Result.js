import Gonad from '../Gonad.js';
import { proxyWrap } from '../helpers.js';

export default class Result extends Gonad {

	extract() {
		return this.value;
	}

	constructor() {
		super();
		if (new.target === Result) {
			throw new Error("Result is an abstract class and cannot be instantiated directly.");
		}
	}

	dump() {
		console.log(this.extract());
		return proxyWrap(this);
	}

}
