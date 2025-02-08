import { default as R } from './Right.js'; // Import Just as J
import { default as L } from './Left.js'; // Import Nothing as N
import { proxyWrap } from '../helpers.js';

export function Either(value, message) {
	if (message == null) message = '';
	return value == null ? Left(message) : Right(value); 
}

export function Right(value) {
	return proxyWrap(new R(value));
}

export function Left(value) {
	return proxyWrap(new L(value));
}