import { default as R } from './Right.js'; // Import Just as J
import { default as L } from './Left.js'; // Import Nothing as N
import { proxy } from '../helpers.js';

export function Either(value, message) {
	return value == null ? Left(message) : Right(value); 
}

export function Right(value) {
	return new Proxy(new R(value), proxy);
}

export function Left(value) {
	return new Proxy(new L(value), proxy);
}