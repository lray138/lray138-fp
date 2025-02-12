// so, this would be a "SuperMonad" or whatever.
// I want an object that obeys this interface.
// I guess we could use tryCatch 
// there was a thought of why not put everythign in a try catch?

import {Right} from './Either/factory.js';

// console.log('alrighty then!');

let j = Right({
	prop: (x) => 5 * 2
    })
	.call("prop", 2)

    

	console.log(j);