import O from './Ok.js';
import E from './Err.js';
import { proxyWrap } from '../helpers.js';

export function Result(value, message) {
	if (message == null) message = '';
	return value == null ? Err(message) : Ok(value);
}

export function Ok(value) {
	return proxyWrap(new O(value));
}

export function Err(value) {
	return proxyWrap(new E(value));
}
