import { default as J } from './Just.js'; // Import Just as J
import { default as N } from './Nothing.js'; // Import Nothing as N

export function Maybe(value) {
	return value == null ? Nothing() : Just(value); 
}

export function Just(value) {
	return new J(value);
}

export function Nothing(value) {
	return new N();
}