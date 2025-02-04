// so, this would be a "SuperMonad" or whatever.
// I want an object that obeys this interface.
// I guess we could use tryCatch 
// there was a thought of why not put everythign in a try catch?

import { Num, numProxy } from './Num/factory.js';
import { Str } from './Str/factory.js';

export function wrapType(value) {
    
    switch (typeof value) {

      case 'number':
          return new Proxy(Num(value), numProxy);
          break;

      case 'string':
          return Str(value);
          break;

    }

    return value;

}