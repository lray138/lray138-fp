import N from './Nil.js';
import { proxyWrap } from '../helpers.js';

export function Nil(message) {
	return proxyWrap(N.of(message));
}

Nil.of = Nil;
