// so, this would be a "SuperMonad" or whatever.
// I want an object that obeys this interface.
// I guess we could use tryCatch 
// there was a thought of why not put everythign in a try catch?

import { default as S } from './Str.js';
import { proxyWrap } from '../helpers.js';

export function Str(value) {
  return proxyWrap(S.of(value));
}

Str.of = Str;