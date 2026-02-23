// so, this would be a "SuperMonad" or whatever.
// I want an object that obeys this interface.
// I guess we could use tryCatch 
// there was a thought of why not put everythign in a try catch?


import { default as N } from './Num.js';
import { Nothing } from '../Maybe/factory.js';
import { proxyWrap } from '../helpers.js';

export function Num(value) {
	return proxyWrap(N.of(value));
}

Num.of = Num;