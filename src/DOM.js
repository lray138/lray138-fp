import {Left, Right} from './Either/factory.js';
import {Lst} from './Arr/factory.js';
import {curry} from './helpers.js';

export function getElementById(id) {
	let el = document.getElementById(id);

	return el == null 
		? Left(`no element with id ${id} found`)
		: Right(el);

}

export function querySelector(s) {
	return querySelectorWithin(s, document);
}

export function querySelectorWithin(s, w) {
	let el = w.querySelector(s);

	return el == null 
		? Left(`no element with selector ${s} found`)
		: Right(el);
}

export function querySelectorAll(s) {
	let els = document.querySelectorAll(s);

	return els.length == 0 
		? Left(`no elements with selector ${s} found`)
		: Lst(Array.from(els));
}

export const addEventListener = curry((event, callable, element) => {
	try {
		element.addEventListener(event, callable);
	} catch(Error) {
		return Left(`problem attaching event listener`);
	}
});