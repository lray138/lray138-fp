import { default as B } from './Boo.js';
import { proxyWrap } from '../helpers.js';

export function Boo(value) {
	return proxyWrap(new B(value));
}