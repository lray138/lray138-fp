// so, this would be a "SuperMonad" or whatever.
// I want an object that obeys this interface.
// I guess we could use tryCatch 
// there was a thought of why not put everythign in a try catch?


import { default as N } from './Num.js';
import { Nothing } from '../Maybe/factory.js';

export const numProxy = {
	    get(target, prop) {

            try {
                if (prop in Number.prototype) {
                    return typeof Number.prototype[prop] === 'function'
                        ? (...args) => wrapType(target.bind(x => x[prop](...args)))
                        : wrapType(target.bind(x => x[prop]));
                }

                if (typeof target[prop] === 'function') {
                    return function (...args) {
                        return target[prop](...args);
                    };
                } else {

                	return target[prop] == null 
             			? () => Nothing()
             			: target[prop];

                }

            } catch (error) {
                console.error("Error in Proxy get trap:", error);
            }
        },

	    set(target, prop, value) {
	      console.log(`Setting property ${prop} to`, value);
	      target[prop] = value;
	      return true;
	    },
	  };


export function Num(value) {
	return new Proxy(N.of(value), numProxy);
}