import {Left, Right} from './Either/factory.js';
import {Lst} from './Lst/factory.js';
import {curry} from './helpers.js';

export default class Dom {
	static getElementById(id) {
		let el = document.getElementById(id);

		return el == null
			? Left(`no element with id ${id} found`)
			: Right(el);
	}

	static querySelector(s) {
		return Dom.querySelectorWithin(s, document);
	}

	static querySelectorWithin(s, w) {
		let el = w.querySelector(s);

		return el == null
			? Left(`no element with selector ${s} found`)
			: Right(el);
	}

	static querySelectorAll(s) {
		let els = document.querySelectorAll(s);

		return els.length == 0
			? Left(`no elements with selector ${s} found`)
			: Lst(Array.from(els));
	}

	static addEventListener(event, callable, element) {
		try {
			element.addEventListener(event, callable);
		} catch (error) {
			return Left(`problem attaching event listener`);
		}
	}
}

export function getElementById(id) {
	return Dom.getElementById(id);
}

export function querySelector(s) {
	return Dom.querySelector(s);
}

export function querySelectorWithin(s, w) {
	return Dom.querySelectorWithin(s, w);
}

export function querySelectorAll(s) {
	return Dom.querySelectorAll(s);
}

export const addEventListener = curry((event, callable, element) => {
	return Dom.addEventListener(event, callable, element);
});