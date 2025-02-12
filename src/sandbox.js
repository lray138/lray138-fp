// so, this would be a "SuperMonad" or whatever.
// I want an object that obeys this interface.
// I guess we could use tryCatch 
// there was a thought of why not put everythign in a try catch?

import {Right} from './Either/factory.js';
import {Arr} from './Arr/factory.js';

// console.log('alrighty then!');

let j = Arr({
	prop: (x) => x * 2,
	test: 'asdf'
    })
	.call("prdop", 2)