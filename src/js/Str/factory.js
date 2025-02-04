// so, this would be a "SuperMonad" or whatever.
// I want an object that obeys this interface.
// I guess we could use tryCatch 
// there was a thought of why not put everythign in a try catch?

import { default as S } from './Str.js';
import { wrapType } from '../helpers.js';

export function Str(value) {

  return new Proxy(S.of(value), {
    get(target, prop) {

    	if(prop in String.prototype) {
    		return typeof String.prototype[prop] === 'function'
    			? wrapType(target.bind(x => x[prop](...args)))
    			: wrapType(target.bind(x => x[prop]));
    	}

      // Check if the property exists on the wrapped object or if it's a method you want to handle
      if (typeof target[prop] === 'function') {
        return function(...args) {
          console.log(`Calling method ${prop} with arguments`, args);
          return target[prop](...args); // Call the original method
        };
      } else {
        console.log(`Accessing property ${prop}`);
        return target[prop]; // Access the property normally
      }
    },

    set(target, prop, value) {
      console.log(`Setting property ${prop} to`, value);
      target[prop] = value;
      return true;
    },
  });

}