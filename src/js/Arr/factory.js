import { default as A } from './Arr.js'; // Import Just as J
import { proxy } from '../helpers.js';

export function Arr(value) {
	return new Proxy(A.of(value), proxy);
}