// so, this would be a "SuperMonad" or whatever.
// I want an object that obeys this interface.
// I guess we could use tryCatch 
// there was a thought of why not put everythign in a try catch?

import { Num } from './Num/factory.js';
import { Str } from './Str/factory.js';
import { Right, Left } from './Either/factory.js';
import { Nothing } from './Maybe/factory.js';

import Gonad from './Gonad.js'

export function wrapType(value) {

    if(value instanceof Gonad) {
        return value;
    }
    
    switch (typeof value) {

      case 'number':
          return Num(value)
          break;

      case 'string':
          return Str(value)
          break;

    }

    return Right(value);
}

export const proxy = {
    get(target, prop) {

      const call = {
        Nothing,
        Left
      };

      const value = target.extract();
      const prototype = value == null 
        ? call[target.type()]()
        : Object.getPrototypeOf(value);
      
        try {

            if (typeof target[prop] === 'function') {
                return function (...args) {
                    return target[prop](...args);
                };
            }

            if (prop in prototype) {
                return typeof prototype[prop] === 'function'
                    ? (...args) => wrapType(target.bind(x => x[prop](...args)))
                    : wrapType(target.bind(x => x[prop]));
            }

            console.log(prop);

            return value[prop] == null 
              ? (target.type() == "Just" 
                ? () => Nothing()
                : () => Left(`'${prop}' not found.`))
              : () => wrapType(value[prop]);

        } catch (error) {
            console.error("Error in Proxy get trap:", error);
        }
    
    },

    // set(target, prop, value) {
    //   console.log(`Setting property ${prop} to`, value);
    //   target[prop] = value;
    //   return true;
    // },
};

export function proxyWrap(x) {
    return x;
    return new Proxy(x, proxy);
}