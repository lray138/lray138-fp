// so, this would be a "SuperMonad" or whatever.
// I want an object that obeys this interface.
// I guess we could use tryCatch 
// there was a thought of why not put everythign in a try catch?

import {Reader} from './Reader/factory.js';

// console.log('alrighty then!');

let r = Reader(x => x.test)
	.bind(x => Reader(x => x.toUpperCase()))
	.run({test: "valuez"});

	console.log(r);