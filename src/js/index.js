// so, this would be a "SuperMonad" or whatever.
// I want an object that obeys this interface.
// I guess we could use tryCatch 
// there was a thought of why not put everythign in a try catch?

import {Str} from './Str/factory.js';
import {Maybe} from './Maybe/factory.js';


console.log(Maybe('test'));