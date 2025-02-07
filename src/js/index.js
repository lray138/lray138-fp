// so, this would be a "SuperMonad" or whatever.
// I want an object that obeys this interface.
// I guess we could use tryCatch 
// there was a thought of why not put everythign in a try catch?

import { Maybe, Just, Nothing } from './Maybe/factory.js';
import { Either, Right, Left } from './Either/factory.js';
import { Arr } from './Arr/factory.js';
import { Str } from './Str/factory.js';
import { Num } from './Num/factory.js';
import { Task } from './Task/factory.js';
import { Future } from './Future/factory.js';
import { Boo } from './Boo/factory.js';
import { proxyWrap } from './helpers.js';

export { Future, Boo, Maybe, Just, Nothing, Either, Right, Left, Arr, Str, Num, Task, proxyWrap };

// import { default as S } from './Str/Str.js';
// export function Str2(value) {
// 	return proxyWrap(S.unit(value));
// }

// import { default as J } from './Maybe/Just.js';
// export function Just(value) {
// 	return proxyWrap(J.unit(value));
// }