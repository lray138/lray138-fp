import { default as J } from './Just.js'; // Import Just as J
import { default as N } from './Nothing.js'; // Import Nothing as N
import { proxy } from '../helpers.js';

export function Maybe(value) {
	return value == null ? Nothing() : Just(value); 
}

export function Just(value) {
	return new Proxy(new J(value), proxy);
}

export function Nothing() {
	return new Proxy(new N(), proxy);
}