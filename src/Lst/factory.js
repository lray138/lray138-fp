import { default as L } from './Lst.js';
import { proxyWrap } from '../helpers.js';

export function Lst(value) {
	return proxyWrap(L.of(value));
}
