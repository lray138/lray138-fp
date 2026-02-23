// so, this would be a "SuperMonad" or whatever.
// I want an object that obeys this interface.
// I guess we could use tryCatch 
// there was a thought of why not put everythign in a try catch?

import { Maybe, Just, Nothing } from './Maybe/factory.js';
import { Either, Right, Left } from './Either/factory.js';
import { Arr, Lst, Kvm } from './Arr/factory.js';
import { Str } from './Str/factory.js';
import { Num } from './Num/factory.js';
import { Task } from './Task/factory.js';
import { Future } from './Future/factory.js';
import { Boo } from './Boo/factory.js';
import { Reader } from './Reader/factory.js';
import { Writer } from './Writer/factory.js';
import { 
	getElementById, 
	querySelector, 
	querySelectorAll,
	querySelectorWithin,
	addEventListener
} from './DOM.js';

export {
	Arr,
	Lst,
	Kvm,
	Boo,
	Future, 
	Maybe, 
		Just, 
		Nothing,
	Num,
	Either,
		Left, 
		Right,
	Str,
	Task,
	Reader,
	Writer,
	getElementById,
	querySelector,
	querySelectorAll,
	addEventListener,
	querySelectorWithin
};