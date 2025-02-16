// so, this would be a "SuperMonad" or whatever.
// I want an object that obeys this interface.
// I guess we could use tryCatch 
// there was a thought of why not put everythign in a try catch?

import { getElementById } from './DOM.js';
import { Response } from 'node-fetch';
import { Right } from './Either/factory.js';


let response = new Response(null, { status: 500 });     
  
try {
    let v = Right(response).status;
    console.log(v);
} catch(e) {
    console.error(e);
}