// so, this would be a "SuperMonad" or whatever.
// I want an object that obeys this interface.
// I guess we could use tryCatch 
// there was a thought of why not put everythign in a try catch?

import { Maybe, Just, Nothing } from './Maybe/factory.js';
import { Either, Right, Left } from './Either/factory.js';
import { Result, Ok, Err } from './Result/factory.js';
import { Nil } from './Nil/factory.js';
import { Lst } from './Lst/factory.js';
import { Kvm } from './Kvm/factory.js';
import { Str } from './Str/factory.js';
import { Num } from './Num/factory.js';
import { Task } from './Task/factory.js';
import { Boo } from './Boo/factory.js';
import { Reader } from './Reader/factory.js';
import Dom from './Dom.js';
import { Writer } from './Writer/factory.js';
import { 
	getElementById, 
	querySelector, 
	querySelectorAll,
	querySelectorWithin,
	addEventListener
} from './Dom.js';

export {
	Lst,
	Kvm,
	Boo,
	Maybe, 
		Just, 
		Nothing,
	Nil,
	Num,
	Either,
		Left, 
		Right,
	Result,
		Ok,
		Err,
	Str,
	Dom,
	Task,
	Reader,
	Writer,
	getElementById,
	querySelector,
	querySelectorAll,
	addEventListener,
	querySelectorWithin
};