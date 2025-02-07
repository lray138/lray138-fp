import { default as A } from './Arr.js'; // Import Just as J
import { proxyWrap } from '../helpers.js';

export function Arr(value) {
	return proxyWrap(A.of(value));
}