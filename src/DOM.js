import {Left, Right} from './Either/factory.js';
import {Arr} from './Arr/factory.js';
import {curry} from './helpers.js';

export function getElementById(id) {
	let el = document.getElementById(id);

	return el == null 
		? Left(`no element with id ${id} found`)
		: Right(el);

}

export function querySelector(s) {
	let el = document.querySelector(s);

	return el == null 
		? Left(`no element with selector ${s} found`)
		: Right(el);

}

export function querySelectorAll(s) {
	let els = document.querySelectorAll(s);

	return els.length == 0 
		? Left(`no elements with selector ${s} found`)
		: Arr(els);
}

export const addEventListener = curry((event, callable, element) => {
	try {
		element.addEventListener(event, callable);
	} catch(Error) {
		return Left(`problem attaching event listener`);
	}
});